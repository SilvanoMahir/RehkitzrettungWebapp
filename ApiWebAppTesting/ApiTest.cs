using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace ApiWebAppTesting
{
    [TestClass]
    public class ApiTest 
    {
        private HttpClient _httpClient;
        private readonly DbContextOptions<ApiTestDbContext> _options;

        string expectedProtocolsResult = "[{\"protocolId\":1,\"protocolCode\":\"GR-0024\",\"clientFullName\":\"Hans Pua\",\"localName\":\"Chomps\",\"pilotFullName\":\"Johannes Erny\"," +
            "\"regionName\":\"Sent\",\"remark\":\"Keine Bemerkung\",\"areaSize\":\">1ha\",\"foundFawns\":1,\"injuredFawns\":0,\"markedFawns\":0,\"date\":\"2023-05-07T12:00:00\"}," +
            "{\"protocolId\":2,\"protocolCode\":\"GR-0023\",\"clientFullName\":\"Mark Smith\",\"localName\":\"Uina\",\"pilotFullName\":\"John Kane\"," +
            "\"regionName\":\"Scuol\",\"remark\":\"Keine Bemerkung\",\"areaSize\":\"<1ha\",\"foundFawns\":2,\"injuredFawns\":1,\"markedFawns\":0,\"date\":\"2023-05-07T12:00:00\"}]";

        public ApiTest() {
            var webAppFactory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
            {
                builder.UseEnvironment("Test");
            });

            _httpClient = webAppFactory.CreateDefaultClient();

            // Set up the in-memory database options
            _options = new DbContextOptionsBuilder<ApiTestDbContext>()
                .UseSqlServer("Server=tcp:sql-server-rehkitzrettung.database.windows.net,1433;Initial Catalog=rehkitzrettung-db-testing;Persist Security Info=False;User ID=adminRehkitzrettungSqlServer;Password=Salvamaint2023_;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;")
                .Options;

            ApiTestDbContext dbContext = new ApiTestDbContext(_options);
            bool value = dbContext.Database.CanConnect();
            DatabaseInitializer databaseInitializer = new DatabaseInitializer(dbContext);
            databaseInitializer.ResetAndInitializeTables();
        }

        [TestMethod]
        public async Task getProtocolsTest()
        {
            var response = await _httpClient.GetAsync("/api/protocols");
            var stringResult = await response.Content.ReadAsStringAsync();

            Assert.AreEqual(expectedProtocolsResult, stringResult);
        }

    }
}