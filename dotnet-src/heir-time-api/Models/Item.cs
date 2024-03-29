using System.ComponentModel.DataAnnotations.Schema;
using heir_time_api.Enums;
using MongoDB.Bson.Serialization.Attributes;

namespace heir_time_api.Models;

/// <summary>
/// Item to be auctioned off
/// </summary>
public class Item
{
  [BsonId]
  [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
  public string? Id { get; set; }
  [BsonElement("title")]
  public required string Title { get; set; }
  [BsonElement("releaseDate")]
  public required DateTime ReleaseDate { get; set; }
  [BsonElement("itemStatus")]
  public required Status ItemStatus { get; set; }
  [BsonElement("statusName")]
  public string? StatusName { get { return ItemStatus.ToString(); } }
  [BsonElement("description")]
  public string? Description { get; set; }
  [BsonElement("location")]
  public string? Location { get; set; }

  [BsonElement("fileUrls")]
  public List<string> FileUrls { get; set; } = [];
  [BsonElement("fileKeys")]
  public List<string> FileKeys { get; set; } = [];
  [BsonElement("recipient")]
  public string? Recipient { get; set; }
  [BsonElement("bids")]
  public List<Bid>? Bids { get; set; }
}