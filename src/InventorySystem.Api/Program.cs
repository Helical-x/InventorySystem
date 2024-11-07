using InventorySystem.Api.data;
using InventorySystem.Api.models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

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
app.UseCors();

app.MapGet("/products", async (ApplicationDbContext dbContext, int pageNumber = 1, int pageSize = 10) =>
{
    var totalProducts = await dbContext.Products.CountAsync();
    var products = await dbContext.Products
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return Results.Ok(
        new
        {
            items = products,
            totalItems = totalProducts
        });
        
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

app.MapGet("/inventories", async (ApplicationDbContext dbContext, int pageNumber = 1, int pageSize = 10) =>
{
    var inventory = await dbContext.Inventories
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return inventory;
}).WithOpenApi();

app.MapPost("/inventories/{productId}/{warehouseId}", async (ApplicationDbContext dbContext, Inventory inventory, int productId, int warehouseId) =>
{
    inventory.ProductId = productId;
    inventory.WarehouseId = warehouseId;
    dbContext.Inventories.Add(inventory);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/inventory/{inventory.InventoryId}", inventory);
}).WithOpenApi();


app.MapPut("/inventories/{inventoryId}", async (ApplicationDbContext dbContext, int inventoryId, Inventory inventory) =>
{
    if (inventoryId != inventory.InventoryId)
    {
        return Results.BadRequest();
    }

    dbContext.Entry(inventory).State = EntityState.Modified;
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();


app.MapDelete("/inventories/{inventoryId}", async (ApplicationDbContext dbContext, int inventoryId) =>
{
    var warehouse = await dbContext.Inventories.FindAsync(inventoryId);
    if (warehouse == null)
    {
        return Results.NotFound();
    }

    dbContext.Inventories.Remove(warehouse);
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();

app.MapGet("/warehouses", async (ApplicationDbContext dbContext, int pageNumber = 1, int pageSize = 10) =>
{
    var products = await dbContext.Warehouses
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return products;
}).WithOpenApi();

app.MapGet("/warehouses/{warehouseId}/products", async (ApplicationDbContext dbContext, int warehouseId, int pageNumber = 1, int pageSize = 10) =>
{
    var products = await dbContext.Inventories
        .Where(i => i.WarehouseId == warehouseId)
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return products;
}).WithOpenApi();


app.MapPost("/warehouses", async (ApplicationDbContext dbContext, Warehouse warehouse) =>
{
    dbContext.Warehouses.Add(warehouse);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/products/{warehouse.WarehouseId}", warehouse);
}).WithOpenApi();

app.MapPut("/warehouses/{warehouseId}", async (ApplicationDbContext dbContext, int warehouseId, Warehouse warehouse) =>
{
    if (warehouseId != warehouse.WarehouseId)
    {
        return Results.BadRequest();
    }

    dbContext.Entry(warehouse).State = EntityState.Modified;
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();


app.MapDelete("/warehouses/{warehouseId}", async (ApplicationDbContext dbContext, int warehouseId) =>
{
    var warehouse = await dbContext.Products.FindAsync(warehouseId);
    if (warehouse == null)
    {
        return Results.NotFound();
    }

    dbContext.Products.Remove(warehouse);
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
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

app.MapPut("/providers/{providerId}", async (ApplicationDbContext dbContext, int providerId, Provider provider) =>
{
    if (providerId != provider.ProviderId)
    {
        return Results.BadRequest();
    }

    dbContext.Entry(provider).State = EntityState.Modified;
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();


app.MapDelete("/providers/{providerId}", async (ApplicationDbContext dbContext, int providerId) =>
{
    var provider = await dbContext.Providers.FindAsync(providerId);
    if (provider == null)
    {
        return Results.NotFound();
    }

    dbContext.Providers.Remove(provider);
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();


app.MapGet("/customers", async (ApplicationDbContext dbContext, int pageNumber = 1, int pageSize = 10) =>
{
    var customers = await dbContext.Customers
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return customers;
}).WithOpenApi();

app.MapPost("/customers", async (ApplicationDbContext dbContext, Customer customer) =>
{
    dbContext.Customers.Add(customer);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/cutomers/{customer.CustomerId}", customer);
}).WithOpenApi();

app.MapPut("/customers/{customerId}", async (ApplicationDbContext dbContext, int customerId, Customer customer) =>
{
    if (customerId != customer.CustomerId)
    {
        return Results.BadRequest();
    }

    dbContext.Entry(customer).State = EntityState.Modified;
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();


app.MapDelete("/customers/{customerId}", async (ApplicationDbContext dbContext, int customerId) =>
{
    var customer = await dbContext.Customers.FindAsync(customerId);
    if (customer == null)
    {
        return Results.NotFound();
    }

    dbContext.Customers.Remove(customer);
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();

app.MapGet("/orders", async (ApplicationDbContext dbContext, int pageNumber = 1, int pageSize = 10) =>
{
    var orders = await dbContext.Orders
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return orders;
}).WithOpenApi();

app.MapPost("/orders", async (ApplicationDbContext dbContext, Order order) =>
{
    dbContext.Orders.Add(order);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/orders/{order.OrderId}", order);
}).WithOpenApi();

app.MapPut("/orders/{orderId}", async (ApplicationDbContext dbContext, int orderId, Order order) =>
{
    if (orderId != order.OrderId)
    {
        return Results.BadRequest();
    }

    dbContext.Entry(order).State = EntityState.Modified;
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();


app.MapDelete("/orders/{orderId}", async (ApplicationDbContext dbContext, int orderId) =>
{
    var order = await dbContext.Orders.FindAsync(orderId);
    if (order == null)
    {
        return Results.NotFound();
    }

    dbContext.Orders.Remove(order);
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}