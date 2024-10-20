﻿using MongoDB.Driver;
using Amazon.S3;
using System.Text.Json;
using heir_time_api.Services.Bid;
using heir_time_api.Services.Items;
using heir_time_api.Repositories.Items;
using heir_time_api.Repositories.Users;
using heir_time_api.Services.User;
using heir_time_api.Services.S3;
using Amazon.Extensions.NETCore.Setup;
using heir_time_api.Repositories.Projects;
using heir_time_api.Services.Projects;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace heir_time_api;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    private MongoClient ConfigureMongoDb()
    {
        var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
        if (connectionString == null)
        {
            Console.WriteLine("You must set your 'MONGODB_URI' environment variable. To learn how to set it, see https://www.mongodb.com/docs/drivers/csharp/current/quick-start/#set-your-connection-string");
            Environment.Exit(0);
        }

        return new MongoClient(connectionString);
    }

    private void RegisterRepositories(IServiceCollection services)
    {
        services.AddSingleton<IItemRepository, ItemRepository>();
        services.AddSingleton<IUserRepository, UserRepository>();
        services.AddSingleton<IProjectRepository, ProjectRepository>();
    }

    private void RegisterServices(IServiceCollection services)
    {
        services.AddScoped<IItemService, ItemService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<IBidService, BidService>();
        services.AddScoped<IS3Service, S3Service>();
    }

    private void ConfigureCors(IApplicationBuilder app)
    {
        var corsUrlsConfig = Configuration.GetSection("Cors").GetValue<string>("AllowedUrls");
        var allowedLocalUrls = new List<string>
        {
            "http://127.0.0.1:5173",
            "http://localhost:5173",
            "http://localhost",
            corsUrlsConfig,
        };


        app.UseCors(builder => builder.WithOrigins(allowedLocalUrls.ToArray()).AllowAnyHeader().AllowAnyMethod().AllowCredentials());
    }

    // This method gets called by the runtime. Use this method to add services to the container
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMvcCore().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);
        services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);
        services.AddSingleton<IMongoClient>(sp => ConfigureMongoDb());

        var cookieDomainConfig = Configuration.GetSection("Cookie").GetValue<string>("Domain");
        var cookieDomainEnv = Environment.GetEnvironmentVariable("COOKIE_DOMAIN");
        Cookie.AddCookie(services, cookieDomainEnv ?? cookieDomainConfig);

        RegisterRepositories(services);
        RegisterServices(services);

        // aws stuff
        AWSOptions awsOptions = Configuration.GetAWSOptions();
        services.AddDefaultAWSOptions(awsOptions);
        services.AddAWSService<IAmazonS3>();

        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "Heir-Time Api",
                Description = "An ASP.NET Core Web API for managing inheritance"
            });
            // using System.Reflection;
            var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
        });
        services.AddCors();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            });
        }

        app.UseHttpsRedirection();

        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();

        ConfigureCors(app);

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapGet("/", async context =>
            {
                await context.Response.WriteAsync("Welcome to running ASP.NET Core");
            });
        });
    }
}