using Amazon.S3.Model;
using heir_time_api.Models;

namespace heir_time_api.Services.S3;

public interface IS3Service
{
    public Task<string?> SaveFile(IFormFile file, string projectId);
    public Task<IEnumerable<S3ObjectDto>?> GetAllFiles(string? projectId, List<string> keys);
    public Task<GetObjectResponse?> GetFile(string projectId, string key);
    public Task<string?> DeleteFile(string projectId, string key);
    public Task<List<string>?> DeleteFiles(string projectId, List<string> keys);
}