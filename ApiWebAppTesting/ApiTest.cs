using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ApiWebAppTesting
{
    [TestClass]
    public class ApiTest
    {
        private HttpClient _httpClient;

        string expectedProtocolsResult = "[{\"protocolId\":1,\"protocolCode\":\"GR-0024\",\"clientFullName\":\"Hans Pua\",\"localName\":\"Chomps\",\"pilotFullName\":\"Johannes Erny\"," +
            "\"regionName\":\"Sent\",\"remark\":\"Keine Bemerkung\",\"areaSize\":\">1ha\",\"foundFawns\":1,\"injuredFawns\":0,\"markedFawns\":0,\"date\":\"2023-05-07T12:00:00\"}," +
            "{\"protocolId\":2,\"protocolCode\":\"GR-0025\",\"clientFullName\":\"Mark Smith\",\"localName\":\"Uina\",\"pilotFullName\":\"John Kane\"," +
            "\"regionName\":\"Scuol\",\"remark\":\"Keine Bemerkung\",\"areaSize\":\"<1ha\",\"foundFawns\":2,\"injuredFawns\":1,\"markedFawns\":0,\"date\":\"2023-05-07T12:00:00\"}]";

        public ApiTest() {
            var webAppFactory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
            {
                builder.UseEnvironment("Development");
            });
            _httpClient = webAppFactory.CreateDefaultClient();
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