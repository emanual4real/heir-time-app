using heir_time_api.Enums;
using heir_time_api.Models;
using heir_time_api.Repositories.Items;
using heir_time_api.Repositories.Projects;
using heir_time_api.Services.Items;
using heir_time_api.Services.S3;
using Moq;
using NUnit.Framework;

namespace test.heir_time_api.Services;

[TestFixture]
class ItemServiceTest
{

    private Mock<IItemRepository> _itemRepositoryMock;
    private Mock<IProjectRepository> _projectRepositoryMock;
    private Mock<IS3Service> _s3ServiceMock;
    private IItemService _itemService;

    readonly private string _userId = "d9f87adsl234sdfa";
    readonly private string _projectId = "asdf9kjh3249sdf";
    readonly private Project _project = new Project()
    {
        Id = "asdf9kjh3249sdf",
        ProjectName = "Test project",
        Owner = "d9f87adsl234sdfa"
    };

    readonly private User _user = new User()
    {
        Id = "d9f87adsl234sdfa",
        EmailAddress = "test@test.com",
        FirstName = "Joe",
        LastName = "Dirt",
    };

    [SetUp]
    public void Setup()
    {
        _itemRepositoryMock = new Mock<IItemRepository>();
        _projectRepositoryMock = new Mock<IProjectRepository>();
        _s3ServiceMock = new Mock<IS3Service>();
        _itemService = new ItemService(_itemRepositoryMock.Object, _projectRepositoryMock.Object, _s3ServiceMock.Object);
        _projectRepositoryMock.Setup(x => x.GetProjectById(_projectId)).ReturnsAsync(_project);
    }

    [Test]
    public async Task Should_Return_ItemId_Async()
    {
        // arrange
        _itemRepositoryMock.Setup(x => x.DeleteItem(_projectId, 0)).ReturnsAsync(0);

        // act
        var response = await _itemService.DeleteItem(_projectId, 0, _user);

        // assert
        Assert.That(response, Is.EqualTo(0));
    }

    [Test]
    public async Task Should_Call_ItemRepository_DeleteItem_Async()
    {
        // arrange
        _itemRepositoryMock.Setup(x => x.DeleteItem(_projectId, 0)).ReturnsAsync(0);

        // act
        await _itemService.DeleteItem(_projectId, 0, _user);

        // assert
        _itemRepositoryMock.Verify(x => x.DeleteItem(_projectId, 0));
    }

    [Test]
    public async Task Should_Call_S3Service_DeleteFiles_Async()
    {
        // arrange
        var item = new Item()
        {
            Title = "Some random item",
            Recipient = "some dude",
            ReleaseDate = DateTime.Now,
            ItemStatus = Status.Goodwill,
            FileKeys = new List<string> { "image.jpg" }
        };

        _s3ServiceMock.Setup(x => x.DeleteFiles(_userId, item.FileKeys));
        _itemRepositoryMock.Setup(x => x.GetItemById(_projectId, 0)).ReturnsAsync(item);

        // act
        await _itemService.DeleteItem(_projectId, 0, _user);

        // assert
        _s3ServiceMock.Verify(x => x.DeleteFiles(_projectId, item.FileKeys));
    }

}