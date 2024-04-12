using heir_time_api.Repositories.Items;
using heir_time_api.Repositories.Users;
using heir_time_api.Services.Item;
using MongoDB.Driver;
using Moq;
using NUnit.Framework;

namespace test.heir_time_api.Services;

[TestFixture]
class ItemServiceTest
{
    private IItemService _itemService;
    private Mock<MongoClient> _clientMock;
    private Mock<IItemRepository> _itemRepositoryMock;
    private Mock<IUserRepository> _userRepositoryMock;

    [SetUp]
    public void Setup()
    {
        _clientMock = new Mock<MongoClient>("connection-string");
        _itemRepositoryMock = new Mock<IItemRepository>();
        _userRepositoryMock = new Mock<IUserRepository>();

        _itemService = new ItemService(_itemRepositoryMock.Object, _userRepositoryMock.Object);

    }

    [Test]
    public async Task Should_Call_Item_Repository_DeleteAsync()
    {
        // arrange
        var itemId = "abasd98234lasdf98234";
        _itemRepositoryMock.Setup(x => x.DeleteItem(itemId)).ReturnsAsync(itemId);

        // act
        var response = await _itemService.DeleteItem(itemId);

        // assert
        Assert.That(response, Is.EqualTo(itemId));
    }
}