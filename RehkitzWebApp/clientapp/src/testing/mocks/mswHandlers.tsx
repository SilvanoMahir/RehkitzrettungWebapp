import { rest } from 'msw'

const mockProtocols = [
    {
        "protocolId": 1,
        "protocolCode": "GR-0024",
        "clientFullName": "Hans Pua",
        "localName": "Chomps",
        "pilotFullName": "Johannes Erny",
        "regionName": "Tasna",
        "remark": "Keine Bemerkung",
        "areaSize": ">1ha",
        "foundFawns": 1,
        "injuredFawns": 0,
        "markedFawns": 0,
        "date": "07.05.2023"
    },
    {
        "protocolId": 3,
        "protocolCode": "GR-0023",
        "clientFullName": "Marcus Tscholl",
        "localName": "Sablunera",
        "pilotFullName": "Armon Parolini",
        "regionName": "Tasna",
        "remark": "",
        "areaSize": "<1ha",
        "foundFawns": 1,
        "injuredFawns": 1,
        "markedFawns": 0,
        "date": "15.08.2023"
    }
]

const mockUser = {
    "userId": 4,
    "userFirstName": "Zentrale",
    "userLastName": "Tasna",
    "userDefinition": "Zentrale Tasna",
    "userFunction": "Zentrale",
    "userRegion": "Tasna",
    "userName": "Zentrale_Tasna",
    "userEmail": "admin@tasna.ch",
    "userPassword": "Password"
}


export const handlers = [
    rest.post(`/api/authenticate/login`, async (req, res, ctx) => {
        console.log('Received request:', req.url.toString())
        return res(ctx.status(200), ctx.json({ token: 'Mocked response' }))
    })
]
