using RehkitzWebApp.Model;

namespace ApiWebAppTesting
{
    public class TestModels
    {
        Protocol[] protcolsList;

        public TestModels()
        {

            // initialize Protocol model with dummy data
            protcolsList = new Protocol[]
            {
                new Protocol
                {
                    ProtocolCode = "GR-0024",
                    ClientFullName = "Hans Pua",
                    LocalName = "Chomps",
                    PilotFullName = "Johannes Erny",
                    RegionName = "1",
                    Remark = "Keine Bemerkung",
                    AreaSize = ">1ha",
                    FoundFawns = 1,
                    InjuredFawns = 0,
                    MarkedFawns = 0,
                    Date = new DateTime(2023, 5, 7, 12, 0, 0),
                    EntryIsDeleted = false
                },
                new Protocol
                {
                    ProtocolCode = "GR-0023",
                    ClientFullName = "Mark Smith",
                    LocalName = "Uina",
                    PilotFullName = "John Kane",
                    RegionName = "1",
                    Remark = "Keine Bemerkung",
                    AreaSize = "<1ha",
                    FoundFawns = 2,
                    InjuredFawns = 1,
                    MarkedFawns = 0,
                    Date = new DateTime(2023, 5, 7, 12, 0, 0),
                    EntryIsDeleted = false
                }
            };
        }

        public Protocol[] getProtocolTestList()
        {
            return protcolsList;
        }

        //add protocolId as this is set by db, so compared data from db and model are the same
        public Protocol[] getProtocolExpectedResultList()
        {
            Protocol[] protcolsList = getProtocolTestList();
            for (int i = 0; i < protcolsList.Length; i++)
            {
                protcolsList[i].ProtocolId = i + 1;
            }
            return protcolsList;
        }

    }
}
