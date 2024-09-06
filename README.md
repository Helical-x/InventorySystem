# Inventory System

This is an inventory management system built with ASP.NET Core and Entity Framework Core.

## Features

- View all products in the inventory
- Add new products to the inventory
- Edit existing products in the inventory
- Delete products from the inventory

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- .NET 8.0 or later
- A suitable IDE such as JetBrains Rider 2023.1.2
- Entity Framework Core 6.0.0 or later

### Running the application

1. Move to the root directory of the project
```bash
cd InventorySystem
```

2. Migrate models to the database by running the following command:

```bash
dotnet ef database update
```

3. Build the application by running the following command:

```bash
dotnet build
```

4. Run the following command to start the application:

```bash
dotnet run
```

3. Open a web browser and navigate to `https://localhost:5209`
4. You should see the home page of the application


## Built With

- [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet) - The web framework used
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) - The Object-Relational Mapping (ORM) framework used

## Authors

- **HolisticDevelop** - *Initial work* - [HolisticDevelop](https://github.com/HolisticDevelop)
