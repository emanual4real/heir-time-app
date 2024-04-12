using Amazon.S3.Model;
using heir_time_api.Models;

namespace heir_time_api.Services.S3;

public interface IS3Service
{
    public Task<string?> SaveFile(IFormFile file, string? prefix);
    public Task<IEnumerable<S3ObjectDto>?> GetAllFiles(string? prefix);
    public Task<GetObjectResponse?> GetFile(string prefix, string key);
    public Task<string?> DeleteFile(string prefix, string key);
    public Task<List<string>?> DeleteFiles(string prefix, List<string> keys);
}