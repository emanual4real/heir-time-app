using MongoDB.Bson.Serialization.Attributes;

namespace heir_time_api.Models;

public class Project
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("projectName")]
    public required string ProjectName { get; set; }

    [BsonElement("owner")]
    public string? Owner { get; set; }

    [BsonElement("admins")]
    public List<string> Admins { get; set; } = new List<string>();

    [BsonElement("users")]
    public List<string> Users { get; set; } = new List<string>();

    [BsonElement("items")]
    public List<Item>? Items { get; set; } = new List<Item>();

}