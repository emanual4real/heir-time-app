using MongoDB.Bson.Serialization.Attributes;

namespace heir_time_api.Models;
public class Login
{
    [BsonElement("emailAddress")]
    public required string EmailAddress { get; set; }

    [BsonElement("password")]
    public required string Password { get; set; }
}