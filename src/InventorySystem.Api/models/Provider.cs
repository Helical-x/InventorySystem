namespace InventorySystem.Api.models;

public class Provider
{
    public int ProviderId { get; set; }
    public string ProviderName { get; set; }
    public string ProviderAddress { get; set; }
    
    public List<Order> Orders { get; } = new List<Order>();
}