using MongoDB.Driver;
using heir_time_api.Repositories.Items;
using System.Text.Json;
using heir_time_api.Repositories.Users;
using heir_time_api.Services.User;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Net;
using heir_time_api.Services.Bid;
using heir_time_api.Services.Item;
using Amazon.S3;

namespace heir_time_api;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    private Task UnAuthorizedResponse(RedirectContext<CookieAuthenticationOptions> context)
    {
        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
        return Task.CompletedTask;
    }

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
    }

    private void RegisterServices(IServiceCollection services)
    {
        services.AddScoped<IItemService, ItemService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IBidService, BidService>();
    }

    private void ConfigureCors(IApplicationBuilder app)
    {
        app.UseCors(builder => builder.WithOrigins("http://127.0.0.1:5173", "http://localhost:5173", "http://18.232.149.16").AllowAnyHeader().AllowAnyMethod().AllowCredentials());
    }

    // This method gets called by the runtime. Use this method to add services to the container
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMvcCore().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);
        services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);
        services.AddSingleton<IMongoClient>(sp => ConfigureMongoDb());

        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
        {
            options.Cookie.SameSite = SameSiteMode.None;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.Name = "Heir-Time";
            options.Cookie.Path = "/";
            // TODO: localhost doesn't work in postman
            // options.Cookie.Domain = "127.0.0.1";
            options.Cookie.Domain = ".localhost";
            options.ExpireTimeSpan = TimeSpan.FromHours(1);
            options.SlidingExpiration = true;
            options.Events.OnRedirectToAccessDenied = UnAuthorizedResponse;
            options.Events.OnRedirectToLogin = UnAuthorizedResponse;
        });

        RegisterRepositories(services);
        RegisterServices(services);

        // aws stuff
        services.AddDefaultAWSOptions(Configuration.GetAWSOptions());
        services.AddAWSService<IAmazonS3>();

        services.AddSwaggerGen();
        services.AddCors();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
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