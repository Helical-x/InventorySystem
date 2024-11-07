namespace InventorySystem.Api.models;

public class Transfer
{
    public int TransferId { get; set; }
    public int ProductId { get; set; }
    public int Wharehouse1Id { get; set; }
    public int Wharehouse2Id { get; set; }
    public int TransferQuantity { get; set; }
    public DateTime SentDate { get; set; }
    public DateTime ReceivedDate { get; set; }
    
    public Product Product { get; set; } = null!;
    public Warehouse Wharehouse1 { get; set; } = null!;
    public Warehouse Wharehouse2 { get; set; } = null!;
}