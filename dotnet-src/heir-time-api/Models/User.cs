using MongoDB.Bson.Serialization.Attributes;

namespace heir_time_api.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("firstName")]
    public required string FirstName { get; set; }

    [BsonElement("lastName")]
    public required string LastName { get; set; }

    [BsonElement("emailAddress")]
    public required string EmailAddress { get; set; }

    [BsonElement("password")]
    public string? Password { get; set; }

    [BsonElement("ownedProjects")]
    public string[]? OwnedProjects { get; set; }

    [BsonElement("endowmentProjects")]
    public string[]? EndowmentProjects { get; set; }

    [BsonElement("phoneNumber")]
    public string? PhoneNumber { get; set; }

    [BsonElement("address")]
    public string? Address { get; set; }


}