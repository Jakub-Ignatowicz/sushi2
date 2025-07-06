using FluentValidation;
using Microsoft.AspNetCore.Identity;
using SushiZume.Data;
using Microsoft.EntityFrameworkCore;
using SushiZume.Extensions;
using SushiZume.Mapping;
using SushiZume.Middleware;
using SushiZume.Repositories;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services;
using SushiZume.Services.Interfaces;
using SushiZume.Models;
using SushiZume.Options;

const string allowLocalhostOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();
builder.Configuration.AddEnvironmentVariables();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
var config = builder.Configuration;

builder.Services.Configure<JwtOptions>(
    builder.Configuration.GetSection(JwtOptions.JwtOptionsKey));

// DB
builder.Services.AddIdentity<User, IdentityRole<Guid>>(opt =>
{
    opt.Password.RequireDigit = true;
    opt.Password.RequireLowercase = true;
    opt.Password.RequireNonAlphanumeric = true;
    opt.Password.RequireUppercase = true;
    opt.Password.RequiredLength = 8;
}).AddEntityFrameworkStores<SushiContext>();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SushiContext>(options =>
    options.UseNpgsql(connectionString).UseSnakeCaseNamingConvention());

// Register repositories
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductItemRepository, ProductItemRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Register services
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddAuth(config);
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowLocalhostOrigins,
        policy =>
        {
            policy.WithOrigins(["http://localhost:3000", "http://192.168.88.103:3000"])
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly, includeInternalTypes: true);
builder.Services.AddHttpContextAccessor();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.WebHost.ConfigureKestrel(options => { options.ListenAnyIP(5152); });

var app = builder.Build();

app.ApplyMigrations();

if (app.Environment.IsDevelopment())
{
    app.UseCors(allowLocalhostOrigins);

    app.UseAuthentication();
    app.UseAuthorization();
    app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseMiddleware<GlobalExceptionHandlerMiddleware>();
}

app.MapControllers();

app.UseStaticFiles();

app.Run();
