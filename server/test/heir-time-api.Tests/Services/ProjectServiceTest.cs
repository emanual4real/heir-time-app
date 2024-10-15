using heir_time_api.Models;
using heir_time_api.Repositories.Projects;
using heir_time_api.Services.Projects;
using Moq;
using NUnit.Framework;

namespace test.heir_time_api.Services;

[TestFixture]
class ProjectServiceTest
{
    private Mock<IProjectRepository> _projectRepositoryMock;
    private IProjectService _projectService;

    readonly private User _user = new User
    {
        Id = "a8adsf679asdf",
        FirstName = "FirstName",
        LastName = "LastName",
        EmailAddress = "email@email.com",
        OwnedProjects = new List<string> { "asdf9867a3492134" },
        Projects = new List<string> { "lkjerw23498asdf" }
    };
    readonly private Project _project = new Project
    {
        Id = "asdf9867a3492134",
        ProjectName = "Test Project",
        Owner = "a8adsf679asdf",
        Admins = ["apasdfopasdf"],
        Users = [],
        Items = [],
    };

    readonly private Project _project2 = new Project
    {
        Id = "lkjerw23498asdf",
        ProjectName = "Test Project 2",
        Owner = "fjo23489sdfl",
    };

    [SetUp]
    public void Setup()
    {
        _projectRepositoryMock = new Mock<IProjectRepository>();
        _projectService = new ProjectService(_projectRepositoryMock.Object);
    }

    [Test]
    public async Task Should_Call_CreateProject_From_Repository()
    {
        // arrange
        var expectedProjectId = "asd9f876asdf78";
        _projectRepositoryMock.Setup(x => x.CreateProject(_project)).ReturnsAsync(_project);

        // act
        var actual = await _projectService.CreateProject(_project, _user);

        // assert
        _projectRepositoryMock.Verify(x => x.CreateProject(_project));
    }

    [Test]
    public async Task Should_Call_DeleteProject_From_Repository_and_return_projectId()
    {
        // arrange
        var expectedProjectId = "asd9f876asdf78";
        _projectRepositoryMock.Setup(x => x.GetProjectById(expectedProjectId)).ReturnsAsync(_project);

        _projectRepositoryMock.Setup(x => x.DeleteProject(expectedProjectId)).ReturnsAsync(expectedProjectId);

        // act
        var actual = await _projectService.DeleteProject(expectedProjectId, _user);

        // arrange
        Assert.That(actual, Is.EqualTo(expectedProjectId));
        _projectRepositoryMock.Verify(x => x.DeleteProject(expectedProjectId));
    }

    [Test]
    public async Task Should_Not_Call_DeleteProject_From_Repository_if_User_is_not_Owner()
    {
        // arrange
        var user = new User
        {
            Id = "basdf89342d",
            FirstName = "FirstName",
            LastName = "LastName",
            EmailAddress = "email@email.com",
            OwnedProjects = []
        };
        var expectedProjectId = "asd9f876asdf78";
        _projectRepositoryMock.Setup(x => x.GetProjectById(expectedProjectId)).ReturnsAsync(_project);

        _projectRepositoryMock.Setup(x => x.DeleteProject(expectedProjectId)).ReturnsAsync(expectedProjectId);

        // act
        await _projectService.DeleteProject(expectedProjectId, user);

        // arrange
        _projectRepositoryMock.Verify(x => x.GetProjectById(expectedProjectId));
        _projectRepositoryMock.VerifyNoOtherCalls();
    }

    [Test]
    public async Task Should_Get_All_Projects_Listed()
    {
        // arrange
        var expectedProjectIds = new List<string> { "lkjerw23498asdf", "asdf9867a3492134" };

        var expectedProjects = new List<Project> {
            _project,
            _project2
        };
        _projectRepositoryMock.Setup(x => x.GetProjects(expectedProjectIds)).ReturnsAsync(expectedProjects);
        // act
        var actual = await _projectService.GetProjectsByUser(_user);
        // assert
        Assert.That(actual.Count, Is.EqualTo(expectedProjectIds.Count));
    }
}