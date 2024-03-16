using Amazon.S3.Model;
using heir_time_api.Models;

namespace heir_time_api.Services.S3;

public interface IS3Service
{

    public Task<string?> SaveFile(IFormFile file, string bucketName, string? prefix);
    public Task<IEnumerable<S3ObjectDto>?> GetAllFiles(string bucketName, string? prefix);
    public Task<GetObjectResponse?> GetFile(string bucketName, string key);
    public Task<string?> DeleteFile(string bucketName, string key);



}