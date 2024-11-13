namespace InventorySystem.Api.dtos;

public class DeliveryDto
{
    public int? DeliveryId { get; set; }
    public int CustomerId { get; set; }
    public DateTime SaleDate { get; set; }
}