using heir_time_api.Models;

namespace heir_time_api.Controllers.InputModels;

public class ItemWithFileInput : Item
{
    public ItemWithFileInput()
    {

    }
    public required string ProjectId { get; set; }
}