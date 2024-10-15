
namespace heir_time_api.Controllers.InputModels;
public class BidInput
{
    public BidInput()
    {

    }

    public required string ProjectId { get; set; }
    public required int ItemId { get; set; }
    public required int Value { get; set; }
    public required string ReceivingDate { get; set; }
}