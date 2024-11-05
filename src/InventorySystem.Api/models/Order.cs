namespace InventorySystem.Api.models;

public class Order
{
    public int OrderId { get; set; }
    public int ProviderId { get; set; }
    public DateTime OrderDate { get; set; }
    
    public Provider Provider { get; set; }
    
}