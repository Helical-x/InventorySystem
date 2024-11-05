namespace InventorySystem.Api.models;

public class Delivery
{
    public int DeliveryId { get; set; }
    public int CustomerId { get; set; }
    public DateTime SaleDate { get; set; }
    
    public Customer Customer { get; set; }
    public List<DeliveryDetail> DeliveryDetails { get; } = new List<DeliveryDetail>();
}