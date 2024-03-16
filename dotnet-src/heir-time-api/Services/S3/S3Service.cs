
using Amazon.S3;
using Amazon.S3.Model;
using heir_time_api.Models;

namespace heir_time_api.Services.S3;

public class S3Service : IS3Service
{
    private readonly IAmazonS3 _s3Client;

    public S3Service(
        IAmazonS3 s3Client
    )
    {
        _s3Client = s3Client;
    }

    private async Task<bool> DoesBucketExist(string bucketName)
    {
        return await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, bucketName);
    }

    public async Task<string?> DeleteFile(string bucketName, string key)
    {
        var bucketExists = await DoesBucketExist(bucketName);

        if (!bucketExists)
        {
            return null;
        }

        await _s3Client.DeleteObjectAsync(bucketName, key);

        return key;
    }

    public async Task<IEnumerable<S3ObjectDto>?> GetAllFiles(string bucketName, string? prefix)
    {
        var bucketExists = await DoesBucketExist(bucketName);

        if (!bucketExists)
        {
            return null;
        }

        var request = new ListObjectsV2Request()
        {
            BucketName = bucketName,
            Prefix = prefix
        };

        var result = await _s3Client.ListObjectsV2Async(request);
        var s3Objects = result.S3Objects.Select(s =>
        {
            var urlRequest = new GetPreSignedUrlRequest()
            {
                BucketName = bucketName,
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

    public async Task<GetObjectResponse?> GetFile(string bucketName, string key)
    {
        var bucketExists = await DoesBucketExist(bucketName);

        if (!bucketExists)
        {
            return null;
        }

        return await _s3Client.GetObjectAsync(bucketName, key);
    }

    public async Task<string?> SaveFile(IFormFile file, string bucketName, string? prefix)
    {
        var bucketExists = await DoesBucketExist(bucketName);

        if (!bucketExists)
        {
            return null;
        }

        var request = new PutObjectRequest()
        {
            BucketName = bucketName,
            Key = string.IsNullOrEmpty(prefix) ? file.FileName : $"{prefix?.TrimEnd('/')}/{file.FileName}",
            InputStream = file.OpenReadStream()
        };
        request.Metadata.Add("Content-Type", file.ContentType);
        await _s3Client.PutObjectAsync(request);

        return $"{prefix}/{file.FileName}";
    }
}