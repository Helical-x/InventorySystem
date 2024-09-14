using InventorySystem.Api.data;
using InventorySystem.Api.models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);


// Configure InMemoryDB for development
if (builder.Environment.IsDevelopment() || true)
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                           throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseInMemoryDatabase(connectionString));
    // var connectionString = builder.Configuration.GetConnectionString("SqlServerConnection") ??
    //                        throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
    // builder.Services.AddDbContext<ApplicationDbContext>(options =>
    //     options.UseSqlServer(connectionString));
    
}
// Configure MySQL for production
else
{
    var connectionString = builder.Configuration.GetConnectionString("MySqlConnection") ??
                           throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

}

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("inventory", policy => 
        policy.RequireRole("Api.ReadOnly", "Api.ReadWrite"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/products", async (ApplicationDbContext dbContext, int pageNumber = 1, int pageSize = 10) =>
{
    var products = await dbContext.Products
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return products;
}).WithOpenApi();


app.MapPost("/products", async (ApplicationDbContext dbContext, Product product) =>
{
    dbContext.Products.Add(product);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/products/{product.ProductId}", product);
}).WithOpenApi();

app.MapPut("/products/{productId}", async (ApplicationDbContext dbContext, int productId, Product product) =>
{
    if (productId != product.ProductId)
    {
        return Results.BadRequest();
    }

    dbContext.Entry(product).State = EntityState.Modified;
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();


app.MapDelete("/products/{productId}", async (ApplicationDbContext dbContext, int productId) =>
{
    var product = await dbContext.Products.FindAsync(productId);
    if (product == null)
    {
        return Results.NotFound();
    }

    dbContext.Products.Remove(product);
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();

app.MapGet("/inventory", async (ApplicationDbContext dbContext, int pageNumber = 1, int pageSize = 10) =>
{
    var inventory = await dbContext.Inventories
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return inventory;
}).WithOpenApi();

app.MapPost("/inventory", async (ApplicationDbContext dbContext, Inventory inventory) =>
{
    dbContext.Inventories.Add(inventory);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/inventory/{inventory.InventoryId}", inventory);
}).WithOpenApi();

app.MapGet("/providers", async (ApplicationDbContext dbContext, int pageNumber = 1, int pageSize = 10) =>
{
    var providers = await dbContext.Providers
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return providers;
}).WithOpenApi();

app.MapPost("/providers", async (ApplicationDbContext dbContext, Provider provider) =>
{
    dbContext.Providers.Add(provider);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/providers/{provider.ProviderId}", provider);
}).WithOpenApi();



app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}