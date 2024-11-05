namespace InventorySystem.Api.models;

public class DeliveryDetail
{
    public int DeliveryDetailId { get; set; }
    public int ProductId { get; set; }
    public int DeliveryId { get; set; }
    public int WarehouseId { get; set; }
    public int DeliveryQuantity { get; set; }
    public DateTime ExpectedDate { get; set; }
    public DateTime ActualDate { get; set; }
    
    public Product Product { get; set; }
    public Delivery Delivery { get; set; } = null!;
    public Warehouse Warehouse { get; set; }
}