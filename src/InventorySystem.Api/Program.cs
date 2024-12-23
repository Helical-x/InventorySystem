using InventorySystem.Api.data;
using InventorySystem.Api.dtos;
using InventorySystem.Api.models;
using InventorySystem.Api.utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                       throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));


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

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
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

app.MapGet("/products/{productId}", async (ApplicationDbContext dbContext, int productId) =>
{
    var product = await dbContext.Products.FindAsync(productId);
    return product;
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
/*
app.MapGet("/inventories", async (ApplicationDbContext dbContext, int pageNumber = 1, int pageSize = 10) =>
{
    var totalInventories = await dbContext.Inventories.CountAsync();
    var inventories = await dbContext.Inventories
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return Results.Ok(
        new
        {
            items = inventories,
            totalItems = totalInventories
        });
}).WithOpenApi();

app.MapPost("/inventories",
    async (ApplicationDbContext dbContext, InventoryDto inventoryDto) =>
    {
        var product = await dbContext.Products.FindAsync(inventoryDto.ProductId);
        var warehouse = await dbContext.Warehouses.FindAsync(inventoryDto.WarehouseId);
        if (product == null || warehouse == null)
        {
            return Results.BadRequest();
        }
        var newInventory = new Inventory
        {
            ProductId = inventoryDto.ProductId,
            WarehouseId = inventoryDto.WarehouseId,
            QuantityAvailable = inventoryDto.QuantityAvailable,
            MinimumStockLevel = inventoryDto.MinimumStockLevel,
            MaximumStockLevel = inventoryDto.MaximumStockLevel,
            ReorderPoint = inventoryDto.ReorderPoint,
        };
        dbContext.Inventories.Add(newInventory);
        await dbContext.SaveChangesAsync();
        return Results.Created($"/inventory/{newInventory.InventoryId}", newInventory);
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
*/
app.MapGet("/warehouses", async (ApplicationDbContext dbContext, int pageNumber = 1, int pageSize = 10) =>
{
    var totalWarehouses = await dbContext.Warehouses.CountAsync();
    var warehouses = await dbContext.Warehouses
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return Results.Ok(
        new
        {
            items = warehouses,
            totalItems = totalWarehouses
        });
}).WithOpenApi();

app.MapGet("/warehouses/{warehouseId}/products",
    async (ApplicationDbContext dbContext, int warehouseId, int pageNumber = 1, int pageSize = 10) =>
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
    var totalProviders = await dbContext.Providers.CountAsync();
    var providers = await dbContext.Providers
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return Results.Ok(
        new
        {
            items = providers,
            totalItems = totalProviders
        });
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
    var totalCustomers = await dbContext.Customers.CountAsync();
    var customers = await dbContext.Customers
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return Results.Ok(
        new
        {
            items = customers,
            totalItems = totalCustomers
        });
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
    var totalOrders = await dbContext.Orders.CountAsync();
    var orders = await dbContext.Orders
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return Utility.CreateResponse(totalOrders, orders);

}).WithOpenApi();

app.MapPost("/orders", async (ApplicationDbContext dbContext, OrderDto orderDto) =>
{
    var provider = await dbContext.Providers.FindAsync(orderDto.ProviderId);
    if (provider == null)
    {
        return Results.BadRequest();
    }
    
    var order = new Order
    {
        ProviderId = orderDto.ProviderId,
        OrderDate = orderDto.OrderDate,
        Provider = provider
    };
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

app.MapGet("/deliveries", async (ApplicationDbContext dbContext, int pageNumber = 1, int pageSize = 10) =>
{

    var totalDeliveries = await dbContext.Deliveries.CountAsync();
    var deliveries = await dbContext.Deliveries
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return Utility.CreateResponse(totalDeliveries, deliveries);
}).WithOpenApi();

app.MapPost("/deliveries", async (ApplicationDbContext dbContext, DeliveryDto deliveryDto) =>
{
    var customer = await dbContext.Customers.FindAsync(deliveryDto.CustomerId);
    if (customer == null)
    {
        return Results.BadRequest();
    }
    
    var delivery = new Delivery
    {
        CustomerId = deliveryDto.CustomerId,
        SaleDate = deliveryDto.SaleDate,
        Customer = customer
    };
    dbContext.Deliveries.Add(delivery);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/deliveries/{delivery.DeliveryId}", delivery);
}).WithOpenApi();

app.MapPut("/deliveries/{deliveryId}", async (ApplicationDbContext dbContext, int deliveryId, Delivery delivery) =>
{
    if (deliveryId != delivery.DeliveryId)
    {
        return Results.BadRequest();
    }

    dbContext.Entry(delivery).State = EntityState.Modified;
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();


app.MapDelete("/deliveries/{deliveryId}", async (ApplicationDbContext dbContext, int deliveryId) =>
{
    var delivery = await dbContext.Deliveries.FindAsync(deliveryId);
    if (delivery == null)
    {
        return Results.NotFound();
    }

    dbContext.Deliveries.Remove(delivery);
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
}).WithOpenApi();

// <---------------------------------------------//////////--------------------------------------------->
// <---------------------------------------------//////////--------------------------------------------->

app.Run();
