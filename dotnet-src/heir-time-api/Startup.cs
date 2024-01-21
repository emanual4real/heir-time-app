using MongoDB.Driver;
using heir_time_api.Repositories.Items;
using System.Text.Json;

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
    }

    private void ConfigureCors(IApplicationBuilder app)
    {
        app.UseCors(builder => builder.WithOrigins("http://127.0.0.1:5173"));
    }

    // This method gets called by the runtime. Use this method to add services to the container
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);
        services.AddSingleton<IMongoClient>(sp => ConfigureMongoDb());
        RegisterRepositories(services);

        services.AddSwaggerGen();
        services.AddCors();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

        Console.WriteLine(env.IsDevelopment());
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
                await context.Response.WriteAsync("Welcome to running ASP.NET Core on AWS Lambda");
            });
        });


    }
}