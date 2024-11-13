namespace InventorySystem.Api.dtos;

public class OrderDto
{
    public int? OrderId { get; set; }
    public int ProviderId { get; set; }
    public DateTime OrderDate { get; set; }
}