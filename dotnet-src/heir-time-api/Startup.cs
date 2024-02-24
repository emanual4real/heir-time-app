using MongoDB.Driver;
using heir_time_api.Repositories.Items;
using System.Text.Json;
using heir_time_api.Repositories.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using heir_time_api.Services.User;

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
    }

    private void RegisterServices(IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
    }

    private void ConfigureCors(IApplicationBuilder app)
    {
        app.UseCors(builder => builder.WithOrigins("http://127.0.0.1:5173", "http://localhost:5173", "http://18.232.149.16").AllowAnyHeader().AllowAnyMethod());
    }

    // This method gets called by the runtime. Use this method to add services to the container
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMvcCore().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);
        services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);
        services.AddSingleton<IMongoClient>(sp => ConfigureMongoDb());

        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("JwtKey").ToString())),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

        RegisterRepositories(services);
        RegisterServices(services);

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