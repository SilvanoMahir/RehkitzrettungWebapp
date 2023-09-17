using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;
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

        // set environment for the client which tests against the test DB 
        public ApiTest()
        {
            var webAppFactory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
            {
                builder.UseEnvironment("Test");
            });

            // create client and model for testing
            _httpClient = webAppFactory.CreateDefaultClient();
            models = new TestModels();

            // set up connection to test db and fill reset and initialize with test data of the model
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
        public void getAdminUserProtocolsTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            var responseGet = sendGetProtocolsRequestAsync(token).Result;

            Assert.IsTrue(responseGet.ToString().Contains("StatusCode: 200"));
        }

        [TestMethod]
        public async Task createProtocolTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            sendPostProtocolsRequestAsync(token).Wait();
            var responseGet = sendGetProtocolsRequestAsync(token).Result;
            var stringResult = await responseGet.Content.ReadAsStringAsync();
            List<Protocol> protocolList = models.getProtocolExpectedResultList().ToList();

            Assert.IsTrue((protocolList.Count + 1) == JArray.Parse(stringResult).Count);
        }

        [TestMethod]
        public async Task readProtocolTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            var responseGet = sendGetProtocolsRequestAsync(token).Result;
            var stringResult = await responseGet.Content.ReadAsStringAsync();

            Assert.IsTrue(JArray.Parse(stringResult).Count == 2);
        }

        [TestMethod]
        public async Task updateProtocolTest()
        {
            int protocolIdToUpdate = 2;

            var user = new
            {
                userName = "admin_test",
                userEmail = "admin@tasna.ch",
                userPassword = "Password@123",
                userDefinition = "Admin 1",
                userFirstName = "Kristian",
                userLastName = "Küttel",
                userRegion = "Tasna"
            };

            var userLogin = new
            {
                username = "admin_test",
                password = "Password@123"
            };

            // create a new admin user
            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var responseRegister = await _httpClient.PostAsync("/api/authenticate/register-admin", content);

            // login as admin user
            string jsonLoginPayload = JsonConvert.SerializeObject(userLogin);
            var contentLogin = new StringContent(jsonLoginPayload, Encoding.UTF8, "application/json");
            var responseLogin = await _httpClient.PostAsync("/api/authenticate/login", contentLogin);

            // create new protocol
            string responseString = await responseLogin.Content.ReadAsStringAsync();
            var responseJson = JObject.Parse(responseString);
            string token = responseJson["token"].Value<string>();

            var protocolDtoToUpdate = new ProtocolDto
            {
                ProtocolId = 2,
                ProtocolCode = "GR-0025",
                ClientFullName = "Fritz Weber",
                LocalName = "Chomps",
                PilotFullName = "Johannes Erny",
                RegionName = "Tasna",
                Remark = "Keine Bemerkung",
                AreaSize = ">1ha",
                FoundFawns = 1,
                InjuredFawns = 0,
                MarkedFawns = 0,
                Date = new DateTime()
            };

            // setup request for updating one protocol
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Put,
                RequestUri = new Uri("/api/protocols/" + protocolIdToUpdate, UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Content = new StringContent(JsonConvert.SerializeObject(protocolDtoToUpdate), Encoding.UTF8, "application/json");

            await _httpClient.SendAsync(request);

            // setup request for getting the protocols
            request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/protocols", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // send request
            var responseGet = await _httpClient.SendAsync(request);
            var stringResult = await responseGet.Content.ReadAsStringAsync();

            List<Protocol> protocolList = models.getProtocolExpectedResultList().ToList();

            Assert.IsTrue(stringResult.Contains("Fritz Weber"));
            Assert.IsTrue(protocolList.Count == JArray.Parse(stringResult).Count);
        }

        [TestMethod]
        public async Task deleteProtocolTest()
        {
            int protocolIdToRemove = 2;

            var user = new
            {
                userName = "admin_test",
                userEmail = "admin@tasna.ch",
                userPassword = "Password@123",
                userDefinition = "Admin 1",
                userFirstName = "Silvano",
                userLastName = "Stecher",
                userRegion = "Tasna"
            };

            var userLogin = new
            {
                username = "admin_test",
                password = "Password@123"
            };

            // create a new admin user
            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var responseRegister = await _httpClient.PostAsync("/api/authenticate/register-admin", content);

            // login as admin user
            string jsonLoginPayload = JsonConvert.SerializeObject(userLogin);
            var contentLogin = new StringContent(jsonLoginPayload, Encoding.UTF8, "application/json");
            var responseLogin = await _httpClient.PostAsync("/api/authenticate/login", contentLogin);

            // delete the protocol
            string responseString = await responseLogin.Content.ReadAsStringAsync();
            var responseJson = JObject.Parse(responseString);
            string token = responseJson["token"].Value<string>();

            // setup request for deleting one protocol
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri("/api/protocols/" + protocolIdToRemove, UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            await _httpClient.SendAsync(request);

            // setup request for getting the protocols
            request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/protocols", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // send request
            var responseGet = await _httpClient.SendAsync(request);
            var stringResult = await responseGet.Content.ReadAsStringAsync();

            // get the comparasion object from initialisation db and delete the desired object
            List<Protocol> protocolList = models.getProtocolExpectedResultList().ToList();
            int indexToRemove = protocolList.FindIndex(protocol => protocol.ProtocolId == protocolIdToRemove);
            if (indexToRemove != -1)
            {
                protocolList.RemoveAt(indexToRemove);
            }

            string expectedProtocolsResult = JsonConvert.SerializeObject(protocolList.ToArray());

            Assert.IsTrue(stringResult.Contains(protocolList[0].ProtocolId.ToString()));
            Assert.IsTrue(protocolList.Count == JArray.Parse(stringResult).Count);
        }

        [TestMethod]
        public async Task createAdminUserTest()
        {
            var user = new
            {
                userName = "admin_test",
                userEmail = "admin@tasna.ch",
                userPassword = "Password@123",
                userDefinition = "Admin 1",
                userFirstName = "Silvano",
                userLastName = "Stecher",
                userRegion = "Tasna"
            };

            // setup request for getting the protocols
            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            // send request
            var response = await _httpClient.PostAsync("/api/authenticate/register-admin", content);

            Assert.IsTrue(response.ToString().Contains("StatusCode: 200"));
        }

        [TestMethod]
        public async Task readAdminUserTest()
        {
            var user = new
            {
                userName = "admin_test",
                userEmail = "admin@tasna.ch",
                userPassword = "Password@123",
                userDefinition = "Admin 1",
                userFirstName = "Silvano",
                userLastName = "Stecher",
                userRegion = "Tasna"
            };

            var userLogin = new
            {
                username = "admin_test",
                password = "Password@123"
            };

            // register new admin client
            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var responseRegister = await _httpClient.PostAsync("/api/authenticate/register-admin", content);

            // login with previous created admin user
            string jsonLoginPayload = JsonConvert.SerializeObject(userLogin);
            var contentLogin = new StringContent(jsonLoginPayload, Encoding.UTF8, "application/json");
            var responseLogin = await _httpClient.PostAsync("/api/authenticate/login", contentLogin);

            // get token of the login
            string responseString = await responseLogin.Content.ReadAsStringAsync();
            var responseJson = JObject.Parse(responseString);
            string token = responseJson["token"].Value<string>();

            // setup request for getting the users
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/users", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // send request
            var responseGet = await _httpClient.SendAsync(request);
            var stringResult = await responseGet.Content.ReadAsStringAsync();

            Assert.IsTrue(JArray.Parse(stringResult).Count == 1);
        }

        [TestMethod]
        public async Task updateAdminUserTest()
        {
            var user = new
            {
                userName = "admin_test",
                userEmail = "admin@tasna.ch",
                userPassword = "Password@123",
                userDefinition = "Admin 1",
                userFirstName = "Silvano",
                userLastName = "Stecher",
                userRegion = "Tasna"
            };

            var userLogin = new
            {
                username = "admin_test",
                password = "Password@123"
            };

            var userAdapted = new
            {
                userId = "1",
                userName = "admin_test",
                userMail = "admin@tasna.ch",
                userPassword = "Password@123",
                userDefinition = "Admin 2",
                userFirstName = "Fabio",
                userLastName = "Stecher",
                userRegion = "Tasna",
                userFunction = "Admin"
            };

            // register new admin client
            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var responseRegister = await _httpClient.PostAsync("/api/authenticate/register-admin", content);

            // login with previous created admin user
            string jsonLoginPayload = JsonConvert.SerializeObject(userLogin);
            var contentLogin = new StringContent(jsonLoginPayload, Encoding.UTF8, "application/json");
            var responseLogin = await _httpClient.PostAsync("/api/authenticate/login", contentLogin);

            // get token of the login
            string responseString = await responseLogin.Content.ReadAsStringAsync();
            var responseJson = JObject.Parse(responseString);
            string token = responseJson["token"].Value<string>();

            // Serialize the payload to JSON
            string jsonPayloadAdaptAdmin = JsonConvert.SerializeObject(userAdapted);

            // Setup request for adapting the user
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Put,
                RequestUri = new Uri("/api/users/1", UriKind.Relative),
                Content = new StringContent(jsonPayloadAdaptAdmin, Encoding.UTF8, "application/json")
            };

            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // Send the request
            var responsePut = await _httpClient.SendAsync(request);

            // setup request for getting the users
            request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/users", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // send request
            var responseGet = await _httpClient.SendAsync(request);
            var stringResult = await responseGet.Content.ReadAsStringAsync();

            Assert.IsTrue(responsePut.ToString().Contains("StatusCode: 200"));
            Assert.IsTrue(stringResult.ToString().Contains("Admin 2"));
        }

        [TestMethod]
        public async Task deleteAdminUserTest()
        {
            int userIdToRemove = 1;

            var user = new
            {
                userName = "admin_test",
                userEmail = "admin@tasna.ch",
                userPassword = "Password@123",
                userDefinition = "Admin 1",
                userFirstName = "Silvano",
                userLastName = "Stecher",
                userRegion = "Tasna"
            };

            var userLogin = new
            {
                username = "admin_test",
                password = "Password@123"
            };

            // register new admin client
            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var responseRegister = await _httpClient.PostAsync("/api/authenticate/register-admin", content);

            // login with previous created admin user
            string jsonLoginPayload = JsonConvert.SerializeObject(userLogin);
            var contentLogin = new StringContent(jsonLoginPayload, Encoding.UTF8, "application/json");
            var responseLogin = await _httpClient.PostAsync("/api/authenticate/login", contentLogin);

            // get token of the login
            string responseString = await responseLogin.Content.ReadAsStringAsync();
            var responseJson = JObject.Parse(responseString);
            string token = responseJson["token"].Value<string>();

            // Setup request for deleting the user
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri("/api/users/" + userIdToRemove, UriKind.Relative),
            };

            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // Send the request
            var responseDelete = await _httpClient.SendAsync(request);

            // setup request for getting the users
            request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/users", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // send request
            var responseGet = await _httpClient.SendAsync(request);
            var stringResult = await responseGet.Content.ReadAsStringAsync();

            Assert.IsTrue(responseDelete.ToString().Contains("StatusCode: 204"));
            Assert.IsTrue(responseDelete.ToString().Contains("ReasonPhrase: 'No Content'"));
            Assert.IsTrue(stringResult.ToString() == "");
        }

        [TestMethod]
        public async Task readRegionTest()
        {
            var user = new
            {
                userName = "admin_test",
                userEmail = "admin@tasna.ch",
                userPassword = "Password@123",
                userDefinition = "Admin 1",
                userFirstName = "Kristian",
                userLastName = "Küttel",
                userRegion = "Tasna"
            };

            var userLogin = new
            {
                username = "admin_test",
                password = "Password@123"
            };

            // create a new admin user
            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var responseRegister = await _httpClient.PostAsync("/api/authenticate/register-admin", content);

            // login as admin user
            string jsonLoginPayload = JsonConvert.SerializeObject(userLogin);
            var contentLogin = new StringContent(jsonLoginPayload, Encoding.UTF8, "application/json");
            var responseLogin = await _httpClient.PostAsync("/api/authenticate/login", contentLogin);

            string responseString = await responseLogin.Content.ReadAsStringAsync();
            var responseJson = JObject.Parse(responseString);
            string token = responseJson["token"].Value<string>();

            // setup request for getting the regions
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/regions", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // send request
            var responseGet = await _httpClient.SendAsync(request);
            var stringResult = await responseGet.Content.ReadAsStringAsync();

            Assert.IsTrue(stringResult.Contains("\"regionName\":\"Tasna\""));
            Assert.IsTrue(JArray.Parse(stringResult).Count == 1);
        }

        [TestMethod]
        public async Task readAreaTest()
        {
            var user = new
            {
                userName = "admin_test",
                userEmail = "admin@tasna.ch",
                userPassword = "Password@123",
                userDefinition = "Admin 1",
                userFirstName = "Kristian",
                userLastName = "Küttel",
                userRegion = "Tasna"
            };

            var userLogin = new
            {
                username = "admin_test",
                password = "Password@123"
            };

            // create a new admin user
            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var responseRegister = await _httpClient.PostAsync("/api/authenticate/register-admin", content);

            // login as admin user
            string jsonLoginPayload = JsonConvert.SerializeObject(userLogin);
            var contentLogin = new StringContent(jsonLoginPayload, Encoding.UTF8, "application/json");
            var responseLogin = await _httpClient.PostAsync("/api/authenticate/login", contentLogin);

            string responseString = await responseLogin.Content.ReadAsStringAsync();
            var responseJson = JObject.Parse(responseString);
            string token = responseJson["token"].Value<string>();

            // setup request for getting the areas
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/area", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // send request
            var responseGet = await _httpClient.SendAsync(request);
            var stringResult = await responseGet.Content.ReadAsStringAsync();

            Assert.IsTrue(stringResult.Contains("\"areaSize\":\">1ha\""));
            Assert.IsTrue(JArray.Parse(stringResult).Count == 1);
        }

        private void resetAndInitializeTestDB()
        {
            // setup dbcontext and check if connections is established
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

        private async Task registerNewAdminClientAsync()
        {
            var user = new
            {
                userName = "admin_test",
                userEmail = "admin@tasna.ch",
                userPassword = "Password@123",
                userDefinition = "Admin 1",
                userFirstName = "Silvano",
                userLastName = "Stecher",
                userRegion = "Tasna"
            };

            string jsonPayload = JsonConvert.SerializeObject(user);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            await _httpClient.PostAsync("/api/authenticate/register-admin", content);
        }

        private async Task<HttpResponseMessage> loginAsAdminClientAsync()
        {
            var userLogin = new
            {
                username = "admin_test",
                password = "Password@123"
            };

            string jsonLoginPayload = JsonConvert.SerializeObject(userLogin);
            var contentLogin = new StringContent(jsonLoginPayload, Encoding.UTF8, "application/json");

            return await _httpClient.PostAsync("/api/authenticate/login", contentLogin);
        }

        private async Task<string> getTokenAsync(HttpResponseMessage responseLogin)
        {
            string responseString = await responseLogin.Content.ReadAsStringAsync();
            var responseJson = JObject.Parse(responseString);

            return responseJson["token"].Value<string>();
        }

        private async Task<HttpResponseMessage> sendGetProtocolsRequestAsync(string token)
        {
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/protocols", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            return await _httpClient.SendAsync(request);
        }

        private async Task sendPostProtocolsRequestAsync(string token)
        {
            var newProtocolDto = new ProtocolDto
            {
                ProtocolCode = "GR-0025",
                ClientFullName = "Fritz Weber",
                LocalName = "Chomps",
                PilotFullName = "Johannes Erny",
                RegionName = "Tasna",
                Remark = "Keine Bemerkung",
                AreaSize = ">1ha",
                FoundFawns = 1,
                InjuredFawns = 0,
                MarkedFawns = 0,
                Date = new DateTime(),
            };

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("/api/protocols", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Content = new StringContent(JsonConvert.SerializeObject(newProtocolDto), Encoding.UTF8, "application/json");

            await _httpClient.SendAsync(request);
        }

    }
}