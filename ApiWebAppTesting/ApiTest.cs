using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RehkitzWebApp.Model;
using System.Net.Http.Headers;
using System.Text;

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
        public async Task getUnauthorizedProtocolsTest()
        {
            var response = await _httpClient.GetAsync("/api/protocols");

            Assert.IsTrue(response.ToString().Contains("Unauthorized"));
        }

        [TestMethod]
        public async Task getAdminUserProtocolsTest()
        {
            var user = new
            {
                username = "admin",
                email = "test@ost.ch",
                password = "Password@123"
            };

            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var responseRegister = await _httpClient.PostAsync("/api/authenticate/register-admin", content);

            var userLogin = new
            {
                username = "admin",
                password = "Password@123"
            };

            var contentLogin = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var responseLogin = await _httpClient.PostAsync("/api/authenticate/login", contentLogin);

            string responseString = await responseLogin.Content.ReadAsStringAsync();
            var responseJson = JObject.Parse(responseString);
            string token = responseJson["token"].Value<string>();

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/protocols", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var responseGet = await _httpClient.SendAsync(request);

            Assert.IsTrue(responseGet.ToString().Contains("StatusCode: 200"));
        }

        [TestMethod]
        public async Task deleteProtocolsTest()
        {
            int protocolIdToRemove = 2; //protocolId with this number is deleted

            var user = new
            {
                username = "admin",
                email = "test@ost.ch",
                password = "Password@123"
            };

            var userLogin = new
            {
                username = "admin",
                password = "Password@123"
            };

            // create a new admin user
            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var responseRegister = await _httpClient.PostAsync("/api/authenticate/register-admin", content);

            // login as admin user
            var contentLogin = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var responseLogin = await _httpClient.PostAsync("/api/authenticate/login", contentLogin);

            // delete the protocol
            string responseString = await responseLogin.Content.ReadAsStringAsync();
            var responseJson = JObject.Parse(responseString);
            string token = responseJson["token"].Value<string>();

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri("/api/protocols/" + protocolIdToRemove, UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var responseDelete = await _httpClient.SendAsync(request);

            // get protocol list
            request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/protocols", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var responseGet = await _httpClient.SendAsync(request);
            var stringResult = await responseGet.Content.ReadAsStringAsync();

            List<Protocol> protocolList = models.getProtocolExpectedResultList().ToList();
            int indexToRemove = protocolList.FindIndex(protocol => protocol.ProtocolId == protocolIdToRemove);
            if (indexToRemove != -1)
                protocolList.RemoveAt(indexToRemove);
            string expectedProtocolsResult = JsonConvert.SerializeObject(protocolList.ToArray());

            Assert.IsTrue(stringResult.Contains(protocolList[0].ProtocolId.ToString()));
            Assert.IsTrue((protocolList.Count == JArray.Parse(stringResult).Count));
        }

        [TestMethod]
        public async Task createAdminUserTest()
        {
            var user = new
            {
                username = "admin_test",
                email = "test@ost.ch",
                password = "Password@123"
            };

            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("/api/authenticate/register-admin", content);
            var stringResult = await response.Content.ReadAsStringAsync();

            Assert.IsTrue(response.ToString().Contains("StatusCode: 200"));
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