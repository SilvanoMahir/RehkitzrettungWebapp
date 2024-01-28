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

        public ApiTest()
        {
            var webAppFactory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
            {
                builder.UseEnvironment("Test");
            });

            _httpClient = webAppFactory.CreateDefaultClient();
            models = new TestModels();

            string json = File.ReadAllText("../../../../RehkitzWebApp/appsettings.json");
            JObject obj = JObject.Parse(json);
            string testConnectionString = obj["ConnectionStrings"]["Test"].ToString();

            /*_options = new DbContextOptionsBuilder<ApiTestDbContext>()
                .UseSqlServer(testConnectionString)
                .Options;
            resetAndInitializeTestDB();*/
        }

        [TestMethod]
        public async Task getUnauthorizedProtocolsTest()
        {
            var response = await _httpClient.GetAsync("/api/protocols");
            Assert.IsTrue(response.ToString().Contains("Unauthorized"));
        }

        /*[TestMethod]
        public void createProtocolTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            sendPostProtocolsRequestAsync(token).Wait();
            var stringResult = sendGetProtocolsRequestAsync(token).Result;
            List<Protocol> protocolList = models.getProtocolExpectedResultList().ToList();

            Assert.IsTrue((protocolList.Count + 1) == JArray.Parse(stringResult).Count);
        }

        [TestMethod]
        public void readProtocolTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            var stringResult = sendGetProtocolsRequestAsync(token).Result;

            Assert.IsTrue(JArray.Parse(stringResult).Count == 2);
        }

        [TestMethod]
        public void updateProtocolTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            sendPutProtocolsRequestAsync(token).Wait();
            var stringResult = sendGetProtocolsRequestAsync(token).Result;
            List<Protocol> protocolList = models.getProtocolExpectedResultList().ToList();

            Assert.IsTrue(stringResult.Contains("Fritz Weber"));
            Assert.IsTrue(protocolList.Count == JArray.Parse(stringResult).Count);
        }

        [TestMethod]
        public void deleteProtocolTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            int protocolIdToRemove = 2;
            sendDeleteProtocolsRequestAsync(token, protocolIdToRemove).Wait();
            var stringResult = sendGetProtocolsRequestAsync(token).Result;

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
        public void createAdminUserTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            sendPostUsersRequestAsync(token).Wait();
            var stringResult = sendGetUsersRequestAsync(token).Result;

            Assert.IsTrue(JArray.Parse(stringResult).Count == 2);
        }

        [TestMethod]
        public void readAdminUserTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            var stringResult = sendGetUsersRequestAsync(token).Result;

            Assert.IsTrue(JArray.Parse(stringResult).Count == 1);
        }

        [TestMethod]
        public void updateAdminUserTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            sendPutUsersRequestAsync(token).Wait();
            var stringResult = sendGetUsersRequestAsync(token).Result;

            Assert.IsTrue(stringResult.ToString().Contains("Admin 2"));
        }

        [TestMethod]
        public void deleteAdminUserTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            var responseDelete = sendDeleteUsersRequestAsync(token).Result;

            Assert.IsTrue(responseDelete.ToString().Contains("StatusCode: 204"));
            Assert.IsTrue(responseDelete.ToString().Contains("ReasonPhrase: 'No Content'"));
        }

        [TestMethod]
        public void readRegionTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            var stringResult = sendGetRegionsRequestAsync(token).Result;

            Assert.IsTrue(stringResult.Contains("\"regionName\":\"Tasna\""));
            Assert.IsTrue(JArray.Parse(stringResult).Count == 1);
        }

        [TestMethod]
        public void readAreaTest()
        {
            registerNewAdminClientAsync().Wait();
            var responseLogin = loginAsAdminClientAsync();
            var token = getTokenAsync(responseLogin.Result).Result;

            var stringResult = sendGetAreaRequestAsync(token).Result;

            Assert.IsTrue(stringResult.Contains("\"areaSize\":\">1ha\""));
            Assert.IsTrue(JArray.Parse(stringResult).Count == 1);
        }

        private void resetAndInitializeTestDB()
        {
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

        private async Task<string> sendGetProtocolsRequestAsync(string token)
        {
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/protocols", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var responseGet = await _httpClient.SendAsync(request);

            return await responseGet.Content.ReadAsStringAsync();
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

        private async Task sendPutProtocolsRequestAsync(string token)
        {
            int protocolIdToUpdate = 2;
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

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Put,
                RequestUri = new Uri("/api/protocols/" + protocolIdToUpdate, UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Content = new StringContent(JsonConvert.SerializeObject(protocolDtoToUpdate), Encoding.UTF8, "application/json");

            await _httpClient.SendAsync(request);
        }

        private async Task sendDeleteProtocolsRequestAsync(string token, int protocolIdToRemove)
        {
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri("/api/protocols/" + protocolIdToRemove, UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            await _httpClient.SendAsync(request);
        }

        private async Task<string> sendGetUsersRequestAsync(string token)
        {
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/users", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var responseGet = await _httpClient.SendAsync(request);
            return await responseGet.Content.ReadAsStringAsync();
        }

        private async Task sendPostUsersRequestAsync(string token)
        {
            var userDto = new
            {
                userName = "another_admin",
                userEmail = "admin@tasna.ch",
                userPassword = "Password@123",
                userDefinition = "Admin 1",
                userFirstName = "Paul",
                userLastName = "Keller",
                userRegion = "Tasna",
                userFunction = "Admin"
            };

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("/api/users", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Content = new StringContent(JsonConvert.SerializeObject(userDto), Encoding.UTF8, "application/json");

            await _httpClient.SendAsync(request);
        }

        private async Task sendPutUsersRequestAsync(string token)
        {
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

            string jsonPayloadAdaptAdmin = JsonConvert.SerializeObject(userAdapted);

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Put,
                RequestUri = new Uri("/api/users/1", UriKind.Relative),
                Content = new StringContent(jsonPayloadAdaptAdmin, Encoding.UTF8, "application/json")
            };

            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            await _httpClient.SendAsync(request);
        }

        private async Task<HttpResponseMessage> sendDeleteUsersRequestAsync(string token)
        {
            int userIdToRemove = 1;
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri("/api/users/" + userIdToRemove, UriKind.Relative),
            };

            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            return await _httpClient.SendAsync(request);
        }

        private async Task<string> sendGetRegionsRequestAsync(string token)
        {
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/regions", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var responseGet = await _httpClient.SendAsync(request);
            return await responseGet.Content.ReadAsStringAsync();
        }

        private async Task<string> sendGetAreaRequestAsync(string token)
        {
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("/api/area", UriKind.Relative)
            };
            request.Headers.Add("Authorization", "Bearer " + token);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var responseGet = await _httpClient.SendAsync(request);
            return await responseGet.Content.ReadAsStringAsync();
        }*/
    }
}