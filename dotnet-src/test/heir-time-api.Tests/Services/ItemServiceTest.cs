using heir_time_api.Enums;
using heir_time_api.Models;
using heir_time_api.Repositories.Items;
using heir_time_api.Services.Item;
using heir_time_api.Services.S3;
using Moq;
using NUnit.Framework;

namespace test.heir_time_api.Services;

[TestFixture]
class ItemServiceTest
{

    private Mock<IItemRepository> _itemRepositoryMock;
    private Mock<IS3Service> _s3ServiceMock;
    private IItemService _itemService;

    private string _userId = "d9f87adsl234sdfa";
    private string _itemId = "abasd98234lasdf98234";




    [SetUp]
    public void Setup()
    {
        _itemRepositoryMock = new Mock<IItemRepository>();
        _s3ServiceMock = new Mock<IS3Service>();
        _itemService = new ItemService(_itemRepositoryMock.Object, _s3ServiceMock.Object);
    }

    [Test]
    public async Task Should_Return_ItemId_Async()
    {
        // arrange
        _itemRepositoryMock.Setup(x => x.DeleteItem(_itemId)).ReturnsAsync(_itemId);

        // act
        var response = await _itemService.DeleteItem(_itemId, _userId);

        // assert
        Assert.That(response, Is.EqualTo(_itemId));
    }

    [Test]
    public async Task Should_Call_ItemRepository_DeleteItem_Async()
    {
        // arrange
        _itemRepositoryMock.Setup(x => x.DeleteItem(_itemId)).ReturnsAsync(_itemId);

        // act
        await _itemService.DeleteItem(_itemId, _userId);

        // assert
        _itemRepositoryMock.Verify(x => x.DeleteItem(_itemId));
    }

    [Test]
    public async Task Should_Call_S3Service_DeleteFiles_Async()
    {
        // arrange
        var bucketName = "heir-time";
        var item = new Item()
        {
            Title = "Some random item",
            Recipient = "some dude",
            ReleaseDate = DateTime.Now,
            ItemStatus = Status.Goodwill,
            FileKeys = new List<string> { "image.jpg" }
        };

        _s3ServiceMock.Setup(x => x.DeleteFiles(bucketName, _userId, item.FileKeys));
        _itemRepositoryMock.Setup(x => x.GetItemById(_itemId)).ReturnsAsync(item);

        // act
        await _itemService.DeleteItem(_itemId, _userId);

        // assert
        _s3ServiceMock.Verify(x => x.DeleteFiles(bucketName, _userId, item.FileKeys));
    }

}