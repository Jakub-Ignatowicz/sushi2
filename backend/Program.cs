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
using Microsoft.Extensions.FileProviders;

const string allowLocalhostOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();
builder.Configuration.AddEnvironmentVariables();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// DB
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SushiContext>(options =>
    options.UseNpgsql(connectionString).UseSnakeCaseNamingConvention());

builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddCookie();

// Register repositories
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
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
    options.AddPolicy(name: allowLocalhostOrigins,
        policy => { policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); });
});

// Controllers
builder.Services.AddControllers();

// Validation
builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly, includeInternalTypes: true);

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.WebHost.ConfigureKestrel(options => { options.ListenAnyIP(5152); });

var app = builder.Build();

app.ApplyMigrations();

app.UseAuthorization();
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors(allowLocalhostOrigins);
    app.MapControllers().AllowAnonymous();
}
else if (app.Environment.IsStaging())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();

    app.MapControllers().AllowAnonymous();
}
else
{
    app.MapControllers();
}

app.Run();