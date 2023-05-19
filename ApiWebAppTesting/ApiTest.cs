using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RehkitzWebApp.Model;

namespace ApiWebAppTesting
{
    [TestClass]
    public class ApiTest 
    {
        private HttpClient _httpClient;
        private readonly DbContextOptions<ApiTestDbContext> _options;
        TestModels models;

        //set enviroment for the client which test against the test DB 
        public ApiTest() {
            var webAppFactory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
            {
                builder.UseEnvironment("Test");
            });

            //create client and model for testing
            _httpClient = webAppFactory.CreateDefaultClient();
            models = new TestModels();

            //set up connection to test db and fill reset and initialize with test data of the model
            string json = File.ReadAllText("../../../../RehkitzWebApp/appsettings.json");
            JObject obj = JObject.Parse(json);
            string testConnectionString = obj["ConnectionStrings"]["Test"].ToString();

            _options = new DbContextOptionsBuilder<ApiTestDbContext>()
                .UseSqlServer(testConnectionString)
                .Options;

            resetAndInitializeTestDB();
        }

        [TestMethod]
        public async Task getProtocolsTest()
        {
            var response = await _httpClient.GetAsync("/api/protocols");
            var stringResult = await response.Content.ReadAsStringAsync();

            string expectedProtocolsResult = JsonConvert.SerializeObject(models.getProtocolExpectedResultList());


            Assert.AreEqual(expectedProtocolsResult, stringResult);
        }

        [TestMethod]
        public async Task deleteProtocolsTest()
        {
            int protocolIdToRemove = 2; //protocolId with this number is deleted

            var responseDelete = await _httpClient.DeleteAsync("/api/protocols/"+protocolIdToRemove);
            var responseGet = await _httpClient.GetAsync("/api/protocols");
            var stringResult = await responseGet.Content.ReadAsStringAsync();

            List<Protocol> protocolList = models.getProtocolExpectedResultList().ToList();
            int indexToRemove = protocolList.FindIndex(protocol => protocol.protocolId == protocolIdToRemove);
            if (indexToRemove != -1)
                protocolList.RemoveAt(indexToRemove);
            string expectedProtocolsResult = JsonConvert.SerializeObject(protocolList.ToArray());


            Assert.AreEqual(expectedProtocolsResult, stringResult);
        }
        private void resetAndInitializeTestDB()
        {
            //setup dbcontext and check if connections is established
            ApiTestDbContext dbContext = new ApiTestDbContext(_options);
            if (dbContext.Database.CanConnect())
            {
                DatabaseInitializer databaseInitializer = new DatabaseInitializer(dbContext);
                databaseInitializer.ResetAndInitializeTables();
            }
            else
            {
                throw new Exception("No connection to test DB");
            }

        }

    }
}