namespace InventorySystem.Api.models;

public class Product
{
    public int ProductId { get; set; }
    public string ProductCode { get; set; }
    public string Barcode { get; set; }
    public string ProductName { get; set; }
    public string ProductDescription { get; set; }
    public string ProductCategory { get; set; }
    public int ReorderQuantity { get; set; }
    public decimal ProductWeight { get; set; }
    public decimal ProductHeight { get; set; }
    public decimal ProductWidth { get; set; }
    public decimal ProductDepth { get; set; }

    public List<Inventory> Inventories { get; } = new List<Inventory>();
}