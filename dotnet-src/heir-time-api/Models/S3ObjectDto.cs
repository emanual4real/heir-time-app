namespace heir_time_api.Models;


public class S3ObjectDto
{
    public string? Name { get; set; }
    public string? PresignedUrl { get; set; }
}