
using Amazon.S3;
using Amazon.S3.Model;
using heir_time_api.Models;

namespace heir_time_api.Services.S3;

public class S3Service : IS3Service
{
    private readonly IAmazonS3 _s3Client;
    private readonly IConfiguration _configuration;
    private readonly string _bucketName;


    public S3Service(
        IAmazonS3 s3Client,
        IConfiguration configuration
    )
    {
        _s3Client = s3Client;
        _configuration = configuration;
        _bucketName = GetBucketName();
    }

    private string GetBucketName()
    {
        var bucketName = _configuration.GetSection("AWS").GetValue<string>("BucketName") ?? throw new Exception("BucketName is missing from configuration");
        return bucketName;
    }

    private async Task<bool> DoesBucketExist()
    {
        return await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, _bucketName);
    }

    public async Task<IEnumerable<S3ObjectDto>?> GetAllFiles(string? projectId, List<string> keys)
    {
        var bucketExists = await DoesBucketExist();

        if (!bucketExists)
        {
            return null;
        }

        var request = new ListObjectsV2Request()
        {
            BucketName = _bucketName,
            Prefix = projectId
        };

        var result = await _s3Client.ListObjectsV2Async(request);
        var s3Objects = result.S3Objects.Select(s =>
        {
            var urlRequest = new GetPreSignedUrlRequest()
            {
                BucketName = _bucketName,
                Key = s.Key,
                Expires = DateTime.UtcNow.AddMinutes(1)
            };
            return new S3ObjectDto()
            {
                Name = s.Key.ToString(),
                PresignedUrl = _s3Client.GetPreSignedURL(urlRequest),
            };
        });

        return s3Objects;
    }

    public async Task<GetObjectResponse?> GetFile(string projectId, string key)
    {
        var bucketExists = await DoesBucketExist();

        if (!bucketExists)
        {
            return null;
        }

        return await _s3Client.GetObjectAsync(_bucketName, key);
    }

    public async Task<string?> SaveFile(IFormFile file, string? projectId)
    {
        var bucketExists = await DoesBucketExist();

        if (!bucketExists)
        {
            return null;
        }

        var request = new PutObjectRequest()
        {
            BucketName = _bucketName,
            Key = string.IsNullOrEmpty(projectId) ? file.FileName : $"{projectId?.TrimEnd('/')}/{file.FileName}",
            InputStream = file.OpenReadStream()
        };
        request.Metadata.Add("Content-Type", file.ContentType);
        await _s3Client.PutObjectAsync(request);

        return $"{projectId}/{file.FileName}";
    }

    public async Task<string?> DeleteFile(string projectId, string key)
    {
        var bucketExists = await DoesBucketExist();

        if (!bucketExists)
        {
            return null;
        }

        await _s3Client.DeleteObjectAsync(_bucketName, $"{projectId}/{key}");

        return key;
    }

    public async Task<List<string>?> DeleteFiles(string projectId, List<string> keys)
    {
        KeyVersion makeKeyVersion(string key) => new()
        {
            Key = $"{projectId}/${key}"
        };

        var bucketExists = await DoesBucketExist();

        if (!bucketExists)
        {
            return null;
        }

        var keyList = keys.Select(x => makeKeyVersion(x)).ToList();

        var deleteMultipleRequest = new DeleteObjectsRequest()
        {
            BucketName = _bucketName,
            Objects = keyList,
        };

        await _s3Client.DeleteObjectsAsync(deleteMultipleRequest);

        return keys;
    }
}