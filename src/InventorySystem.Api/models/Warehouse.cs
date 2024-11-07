namespace InventorySystem.Api.models;

public class Warehouse
{
    public int WarehouseId { get; set; }
    public string WarehouseName { get; set; }
    public string WarehouseAddress { get; set; }
    
    public List<Inventory> Inventories { get; } = new List<Inventory>();
}