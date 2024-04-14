
using heir_time_api.Enums;
using MongoDB.Bson.Serialization.Attributes;

namespace heir_time_api.Controllers.InputModels;
public class ItemWithFileInput
{
    public ItemWithFileInput()
    {

    }

    [BsonElement("title")]
    public required string Title { get; set; }
    [BsonElement("releaseDate")]
    public required DateTime ReleaseDate { get; set; }
    [BsonElement("itemStatus")]
    public required Status ItemStatus { get; set; }

    public required string ProjectId { get; set; }
}