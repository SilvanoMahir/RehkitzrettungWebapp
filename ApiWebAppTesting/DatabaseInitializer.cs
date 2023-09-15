using ApiWebAppTesting;
using Microsoft.EntityFrameworkCore;
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
        //drop and recreate the tables
        bool value = _dbContext.Database.CanConnect();

        //try catch necessary to catch exceptions, otherwise tests will fail 
        try
        {
            _dbContext.Database.ExecuteSqlRaw("USE [rehkitzrettung-db-testing]");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS Protocol");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS Region");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS [User]");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS Area");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS AspNetUserTokens");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS AspNetRoleClaims");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS AspNetUserClaims");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS AspNetUserLogins");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS AspNetUserRoles");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS __EFMigrationsHistory");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS AspNetRoles");
            _dbContext.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS AspNetUsers");
        }
        catch (Exception e)
        {
            Console.WriteLine("Exception reseting tables:", e);
        }

        _dbContext.SaveChanges();
        bool result = _dbContext.Database.EnsureCreated();

        //fill the tables with initial data
        FillProtocolTable();
        FillRegionTable();
        FillAreaTable();
    }

    private void FillProtocolTable()
    {
        _dbContext.Database.EnsureCreated();
        try
        {
            // Create Protocol table
            _dbContext.Database.ExecuteSqlRaw(@"
                CREATE TABLE Protocol (
                    ProtocolId INT IDENTITY(1, 1) PRIMARY KEY,
                    ProtocolCode NVARCHAR(50) NOT NULL,
                    ClientFullName NVARCHAR(50) NOT NULL,
                    LocalName NVARCHAR(50) NOT NULL,
                    PilotFullName NVARCHAR(50) NOT NULL,
                    RegionName NVARCHAR(50) NOT NULL,
                    Remark NVARCHAR(250) NULL,
                    AreaSize NVARCHAR(50) NOT NULL,
                    FoundFawns INT NOT NULL,
                    InjuredFawns INT NOT NULL,
                    MarkedFawns INT NOT NULL,
                    Date DATETIME2 NOT NULL, 
                    EntryIsDeleted BIT NOT NULL
                );");

            // Create Region table
            _dbContext.Database.ExecuteSqlRaw(@"
                CREATE TABLE Region (
                    RegionId INT IDENTITY(1, 1) PRIMARY KEY,
                    RegionName NVARCHAR(50) NOT NULL,
                    RegionDistrict NVARCHAR(50) NOT NULL,
                    RegionState NVARCHAR(50) NOT NULL,
                    ContactPersonLastName NVARCHAR(50) NULL,
                    ContactPersonFirstName NVARCHAR(50) NULL,
                    ContactPersonEmail NVARCHAR(50) NULL,
                    EntryIsDeleted BIT NOT NULL
                );");

            // Create Area table
            _dbContext.Database.ExecuteSqlRaw(@"
                CREATE TABLE Area (
                    AreaId INT IDENTITY(1, 1) PRIMARY KEY,
                    AreaSize NVARCHAR(50) NOT NULL,
                    EntryIsDeleted BIT NOT NULL
                );");

            // Create User table
            _dbContext.Database.ExecuteSqlRaw(@"
                CREATE TABLE [User] (
                    UserId INT IDENTITY(1, 1) PRIMARY KEY,
                    UserFirstName NVARCHAR(50) NOT NULL,
                    UserLastName NVARCHAR(50) NOT NULL,
                    UserRole NVARCHAR(50) NOT NULL,
                    UserMail NVARCHAR(50) NOT NULL,
                    EntryIsDeleted BIT NOT NULL
                );");
        }
        catch (Exception e)
        {
            Console.WriteLine("Exception creating tables:", e);
        }

        // Fill Protocol table with data
        _dbContext.Protocol.AddRange(models.getProtocolTestList());
        _dbContext.SaveChanges();

    }

    private void FillRegionTable()
    {
        var regions = new List<Region>
        {
            new Region
            {
                    RegionName= "Tasna",
                    RegionState = "GR",
                    RegionDistrict = "Bezirk 10",
                    ContactPersonFirstName = "Chomps",
                    ContactPersonLastName = "Johannes Erny",
                    ContactPersonEmail = "admin@tasna.ch",
                    EntryIsDeleted = false
            }
        };

        _dbContext.Region.AddRange(regions);
        _dbContext.SaveChangesAsync();
    }

    private void FillAreaTable()
    {
        var areas = new List<Area>
        {
            new Area
            {
                    AreaSize = ">1ha",
                    EntryIsDeleted = false
            }
        };

        _dbContext.Area.AddRange(areas);
        _dbContext.SaveChangesAsync();
    }
}

