using ApiWebAppTesting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RehkitzWebApp.Model;


public class DatabaseInitializer
{
    private readonly ApiTestDbContext _dbContext;
    TestModels models;

    public DatabaseInitializer(ApiTestDbContext dbContext)
    {
        _dbContext = dbContext;
        models = new TestModels();
    }

    public void ResetAndInitializeTables()
    {
        // Drop and recreate the tables
        bool value = _dbContext.Database.CanConnect();
        _dbContext.Database.ExecuteSqlRaw("USE [rehkitzrettung-db-testing]");
        _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS Protocol");
        _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS Region");
        _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS [User]");

        bool result = _dbContext.Database.EnsureCreated();

        // Fill the tables with initial data
        FillProtocolTable();
    }

    private void FillProtocolTable()
    {
        _dbContext.Database.EnsureCreated();

        // Create Protocol table
        _dbContext.Database.ExecuteSqlRaw(@"
                CREATE TABLE Protocol (
                    protocolId INT IDENTITY(1, 1) PRIMARY KEY,
                    protocolCode NVARCHAR(50) NOT NULL,
                    clientFullName NVARCHAR(50) NOT NULL,
                    localName NVARCHAR(50) NOT NULL,
                    pilotFullName NVARCHAR(50) NOT NULL,
                    regionName NVARCHAR(50) NOT NULL,
                    remark NVARCHAR(250) NULL,
                    areaSize NVARCHAR(50) NOT NULL,
                    foundFawns INT NOT NULL,
                    injuredFawns INT NOT NULL,
                    markedFawns INT NOT NULL,
                    date DATETIME2 NOT NULL
                );");

        // Create Region table
        _dbContext.Database.ExecuteSqlRaw(@"
                CREATE TABLE Region (
                    regionId INT IDENTITY(1, 1) PRIMARY KEY,
                    regionName NVARCHAR(50) NOT NULL,
                    regionState NVARCHAR(50) NOT NULL,
                    contactPersonLastName NVARCHAR(50) NULL,
                    contactPersonFirstName NVARCHAR(50) NULL,
                    contactPersonMail NVARCHAR(50) NULL
                );");

        // Create User table
        _dbContext.Database.ExecuteSqlRaw(@"
                CREATE TABLE [User] (
                    userId INT IDENTITY(1, 1) PRIMARY KEY,
                    userFirstName NVARCHAR(50) NOT NULL,
                    userLastName NVARCHAR(50) NOT NULL,
                    userRole NVARCHAR(50) NOT NULL,
                    userMail NVARCHAR(50) NOT NULL
                );");

        // Fill Protocol table with data
        _dbContext.Protocol.AddRange(models.getProtocolTestList());
        _dbContext.SaveChanges();

    }

    private void FillRegionTable()
    {
        var regions = new List<Region>
        {
            // Add Region instances as needed
        };

        _dbContext.Region.AddRange(regions);
        _dbContext.SaveChangesAsync();
    }

    private void FillUserTable()
    {
        var users = new List<User>
        {
            // Add User instances as needed
        };

        _dbContext.User.AddRange(users);
        _dbContext.SaveChangesAsync();    }
}

