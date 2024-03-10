using MongoDB.Bson.Serialization.Attributes;

namespace heir_time_api.Models;

public class Bid
{
    public Bid()
    {
        CreatedAt = DateTime.Now;
    }

    [BsonElement("value")]
    public required int Value { get; set; }
    [BsonElement("receivingDate")]
    public required DateTime ReceivingDate { get; set; }
    [BsonElement("user")]
    public required string User { get; set; }
    [BsonElement("createdAt")]
    public DateTime? CreatedAt { get; set; }

}