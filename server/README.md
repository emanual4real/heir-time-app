This app runs in a dev container with two other containers.

    * .net C# container
    * node container
    * mongodb container

To run the .net container:
* `docker-compose up` or `docker-compose restart`
* open root of the app.  VS Code will offer to load container
* load dotnet container
* `export MONGODB_URI=mongodb://root:example@mongo:27017`
* `dotnet run --launchsettings=heir-time-api --project=heir-time-api`