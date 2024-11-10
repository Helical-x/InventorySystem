namespace InventorySystem.Api.utils;

public class Utility
{
    public static IResult CreateResponse<T>(int totalItems, T[] items)
    {
        return Results.Ok(
            new
            {
                items,
                totalItems
            });
    }
}