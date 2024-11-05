namespace InventorySystem.Api.models;

public class Customer
{
    public int CustomerId { get; set; }
    public string CustomerName { get; set; }
    public string CustomerAddress { get; set; }
    
    public List<Delivery> Deliveries { get; } = new List<Delivery>();
}