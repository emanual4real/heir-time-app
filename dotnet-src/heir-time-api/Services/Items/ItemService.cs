using heir_time_api.Models;
using heir_time_api.Repositories.Items;
using heir_time_api.Repositories.Projects;
using heir_time_api.Services.S3;

namespace heir_time_api.Services.Items;

public class ItemService : IItemService
{
    private readonly IItemRepository _itemRepository;
    private readonly IProjectRepository _projectRepository;
    private readonly IS3Service _s3Service;

    public ItemService(IItemRepository itemRepository, IProjectRepository projectRepository, IS3Service s3Service)
    {
        _itemRepository = itemRepository;
        _projectRepository = projectRepository;
        _s3Service = s3Service;
    }

    private static Item AddFileUrls(Item item, string prefix, IEnumerable<S3ObjectDto> files)
    {
        if (files.Any())
        {
            var fileKeys = item.FileKeys.Select(y => $"{prefix}/{y}");

            if (fileKeys.Any())
            {
                var fileUrls = files.Where(y => fileKeys.Contains(y.Name)).Select(y => y.PresignedUrl);

                item.FileUrls = fileUrls.ToList();

            }

        }

        return item;
    }

    private static IEnumerable<Item> AddFileUrls(List<Item> items, string prefix, IEnumerable<S3ObjectDto> files)
    {
        if (files.Any())
        {
            return items.Select(x =>
            {
                var fileKeys = x.FileKeys.Select(y => $"{prefix}/{y}");

                if (fileKeys.Any())
                {
                    var fileUrls = files.Where(y => fileKeys.Contains(y.Name)).Select(y => y.PresignedUrl);

                    x.FileUrls = fileUrls.ToList();

                }

                return x;
            });
        }

        return items;
    }

    private async Task<Item> SaveFileToS3(Item item, IFormFile? file, string prefix)
    {
        if (file != null)
        {
            await _s3Service.SaveFile(file, prefix);

            if (item.FileKeys != null)
            {
                item.FileKeys.Add(file.FileName);
            }
            else
            {
                item.FileKeys = [file.FileName];
            }
        }

        return item;
    }

    private async Task<Project> GetProject(string projectId)
    {
        return await _projectRepository.GetProjectById(projectId);
    }

    public async Task<Item?> GetItem(string projectId, int itemId)
    {
        var project = await GetProject(projectId);
        var item = project.Items.Find(x => x.Id == itemId);

        // missing item
        if (item == null || project.Items == null)
        {
            throw new Exception("Item not found");
        }

        var fileKeys = project.Items.Find(x => x.Id == itemId).FileKeys;

        var files = await _s3Service.GetAllFiles(projectId, fileKeys);

        if (files != null && item != null)
        {
            return AddFileUrls(item, projectId, files);
        }
        return item;
    }

    public async Task<List<Item>> GetItemsByProject(string projectId)
    {
        var items = await _itemRepository.GetItemsByProjectId(projectId);

        // missing items
        if (items == null)
        {
            throw new Exception("Items not found");
        }

        var fileKeys = items.SelectMany(x => x.FileKeys).ToList();

        var files = await _s3Service.GetAllFiles(projectId, fileKeys);

        if (files != null)
        {
            return AddFileUrls(items, projectId, files).ToList();
        }

        return items;
    }

    public async Task<Item?> AddItem(string projectId, Item item, Models.User user, IFormFile? file)
    {
        var project = await GetProject(projectId);

        if (project.Owner == user.Id)
        {
            var newItem = await SaveFileToS3(item, file, projectId);

            return await _itemRepository.CreateItem(projectId, newItem);
        }
        else
        {
            throw new Exception("Unauthorized");
        }
    }

    public async Task<Item?> UpdateItem(string projectId, Item item, Models.User user, IFormFile? file)
    {
        var project = await GetProject(projectId);

        if (project.Owner == user.Id)
        {
            var newItem = await SaveFileToS3(item, file, projectId);

            return await _itemRepository.UpdateItem(projectId, newItem);
        }
        else
        {
            throw new Exception("Unauthorized");
        }
    }

    public async Task<string?> DeleteAllItems(string projectId, Models.User user)
    {
        var project = await GetProject(projectId);
        // Must be owner to edit project
        if (project.Owner == user.Id)
        {
            var itemList = project.Items.SelectMany(x => x.FileKeys).ToList();

            if (itemList.Count > 0)
            {
                await _s3Service.DeleteFiles(projectId, itemList);
            }

            return await _itemRepository.DeleteAllItems(projectId);
        }
        else
        {
            throw new Exception("Unauthorized");
        }
    }

    public async Task<int?> DeleteItem(string projectId, int itemId, Models.User user)
    {
        var project = await GetProject(projectId);
        // Must be owner to edit project
        if (project.Owner == user.Id)
        {
            var item = await _itemRepository.GetItemById(projectId, itemId);

            if (item != null && item.FileKeys != null)
            {
                await _s3Service.DeleteFiles(projectId, item.FileKeys);
            }

            return await _itemRepository.DeleteItem(projectId, itemId);
        }
        else
        {
            throw new Exception("Unauthorized");
        }
    }
}