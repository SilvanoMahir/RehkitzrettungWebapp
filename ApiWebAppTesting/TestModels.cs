using RehkitzWebApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiWebAppTesting
{
    public class TestModels
    {
        Protocol[] protcolsList;

        public TestModels() {

            // initialize Protocol model with dummy data
            protcolsList = new Protocol[]
            {
                new Protocol
                {
                    protocolCode = "GR-0024",
                    clientFullName = "Hans Pua",
                    localName = "Chomps",
                    pilotFullName = "Johannes Erny",
                    regionName = "Sent",
                    remark = "Keine Bemerkung",
                    areaSize = ">1ha",
                    foundFawns = 1,
                    injuredFawns = 0,
                    markedFawns = 0,
                    date = new DateTime(2023, 5, 7, 12, 0, 0)
                },
                new Protocol
                {
                    protocolCode = "GR-0023",
                    clientFullName = "Mark Smith",
                    localName = "Uina",
                    pilotFullName = "John Kane",
                    regionName = "Scuol",
                    remark = "Keine Bemerkung",
                    areaSize = "<1ha",
                    foundFawns = 2,
                    injuredFawns = 1,
                    markedFawns = 0,
                    date = new DateTime(2023, 5, 7, 12, 0, 0)
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
                protcolsList[i].protocolId = i+1;
            }
            return protcolsList;
        }

    }
}
