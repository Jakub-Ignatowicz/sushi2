using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using SushiZume.Data;
using Microsoft.EntityFrameworkCore;
using SushiZume.Exceptions;
using SushiZume.Extensions;
using SushiZume.Mapping;
using SushiZume.Middleware;
using SushiZume.Repositories;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services;
using SushiZume.Services.Interfaces;

const string allowLocalhostOrigins = "_myAllowSpecificOrigins";

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// builder.Configuration.AddEnvironmentVariables();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// DB
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SushiContext>(options =>
    options.UseNpgsql(connectionString).UseSnakeCaseNamingConvention());

builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddCookie();


// builder.Services.AddProblemDetails(options =>
// {
//     options.CustomizeProblemDetails = context =>
//     {
//         context.ProblemDetails.Instance =
//             $"{context.HttpContext.Request.Method} {context.HttpContext.Request.Path}";
//         context.ProblemDetails.Extensions.TryAdd("requestId", context.HttpContext.TraceIdentifier);
//         var activity = context.HttpContext.Features.Get<IHttpActivityFeature>()?.Activity;
//         context.ProblemDetails.Extensions.TryAdd("traceId", activity?.Id);
//     };
// });
// builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

// Register repositories
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductItemRepository, ProductItemRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAddressRepository, AddressRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

// Register services
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddAutoMapper(typeof(MappingProfile));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowLocalhostOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Controllers
builder.Services.AddControllers();

// Validation
builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly, includeInternalTypes: true);

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(allowLocalhostOrigins);
    app.MapControllers().AllowAnonymous();

    app.ApplyMigrations();
}
else
{
    app.MapControllers();
}

// app.UseExceptionHandler(o => { });
// app.UseStatusCodePages();

// Middleware
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

// Auth
// app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();

// Initialize database
// using var scope = app.Services.CreateScope();
// var context = scope.ServiceProvider.GetRequiredService<SushiContext>();
// await DataInitializer.SeedAsync(context);

app.Run();