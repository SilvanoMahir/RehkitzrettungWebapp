import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { DiscardProtocolButton, SaveProtocolButton } from '../controls/Button'
import { AppContext, ProtocolsContext } from '../../store/context'
import Protocol from '../widgets/Protocol/Protocol'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import { useNavigate } from 'react-router-dom'
import { ROUTE_RESCUE_LIST_PAGE } from '../../App'
import { ProtocolEntries } from '../../models/ProtocolEntries'
import ProtocolEntryForAdaptPage from '../widgets/Protocol/ProtocolEntryForAdaptPage'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'

export default function AdaptProtocolPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })

    const [loadingProtocols, setLoadingProtocols] = useState(true)
    const [protocolCode, setProtocolCode] = useState('')
    const [clientFullName, setClientFullName] = useState('')
    const [inputUserName, setUserName] = useState('')
    const [localName, setLocalName] = useState('')
    const [date, setDate] = useState<Date | null>(new Date())
    const [foundFawns, setFoundFawns] = useState('')
    const [markedFawns, setMarkedFawns] = useState('')
    const [remark, setRemark] = useState('')
    const [pilotFullName, setPilotFullName] = useState('')
    const [regionName, setRegionName] = useState('')
    const [areaSize, setAreaSize] = useState('')
    const [injuredFawns, setInjuredFawns] = useState('')
    const { protocolsListLocal, dispatch } = useContext(ProtocolsContext)
    const { dispatch_token, token } = useContext(AppContext)
    let navigate = useNavigate()

    const protocolEntry = ({
        protocolId: "1",
        protocolCode: "2",
        clientFullName: "3",
        localName: "4",
        date: "5",
        foundFawns: 6,
        markedFawns: 7,
        remark: "8",
        pilotFullName: "9",
        regionName: "10",
        areaSize: "11",
        injuredFawns: 12,
    })

    useEffect(() => {
        const onMount = async () => {
            //token handling can probably be optimized
            const storageToken = localStorage.getItem('user_token');
            if (storageToken !== null) {
                dispatch_token({ type: 'set-token', value: storageToken })
            }
            const protocolsListLocal = await fetchProtocols(storageToken)
            setLoadingProtocols(false)
            dispatch({ type: 'get-protocols', protocolsListLocal })
        }
        onMount()
    }, [dispatch, dispatch_token])

    const fetchProtocols = async (storageToken: string | null) => {
        const response = await fetch('/api/protocols', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${storageToken}`,
            }
        })
        if (response.ok) {
            return await response.json()
        }
        return []
    }

    const search = async () => {
    }

    const discardProtocol = async () => {
        navigate(ROUTE_RESCUE_LIST_PAGE)
    }

    const saveProtocol = async (newProtocol: ProtocolEntries) => {
        const storageToken = localStorage.getItem('user_token');
        const response = await fetch(`/api/protocols`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${storageToken}`, // notice the Bearer before your token
            },
            body: JSON.stringify({
                ProtocolCode: protocolCode,
                ClientFullName: clientFullName,
                LocalName: localName,
                Date: date,
                FoundFawns: 1,
                MarkedFawns: 2,
                Remark: remark,
                PilotFullName: pilotFullName,
                RegionName: regionName,
                AreaSize: areaSize,
                InjuredFawns: 3,
            })
        })
        if (response.ok) {
            dispatch({ type: 'add-protocols', protocolsListLocal, newProtocol })
        }
        navigate(ROUTE_RESCUE_LIST_PAGE)
    }

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <ProtocolLayout>
                        <ProtocolTitle>Protokoll {protocolEntry.protocolCode}</ProtocolTitle>
                        <ColumnContainer>
                            <ProtocolEntryForAdaptPage entry="Auftraggeber" value={clientFullName} callbackFunction={setClientFullName} />
                            <ProtocolEntryForAdaptPage entry="Pilot" value={pilotFullName} callbackFunction={setPilotFullName} />
                            <ProtocolEntryForAdaptPage entry="Lokalname" value={localName} callbackFunction={setLocalName} />
                            <ProtocolEntryForAdaptPage entry="Region" value={regionName} callbackFunction={setRegionName} />
                            <DatePickerRowContainer>
                                <DatePickerLabel>Datum</DatePickerLabel>
                                <DatePicker selected={date} onChange={(date) => setDate(date)} />
                            </DatePickerRowContainer>
                            <ProtocolEntryForAdaptPage entry="Flaeche" value={areaSize} callbackFunction={setAreaSize} />
                            <ProtocolEntryForAdaptPage entry="Gefundene Kitze" value={foundFawns} callbackFunction={setFoundFawns} />
                            <ProtocolEntryForAdaptPage entry="Verletzte Kitze" value={injuredFawns} callbackFunction={setInjuredFawns} />
                            <ProtocolEntryForAdaptPage entry="Markierte Kitze" value={markedFawns} callbackFunction={setMarkedFawns} />
                            <ProtocolEntryForAdaptPage entry="Bemerkung" value={remark} callbackFunction={setRemark} />
                        </ColumnContainer>
                    </ProtocolLayout>
                    <RowContainer>
                        <DiscardProtocolButton onClick={() => discardProtocol()}>Verwerfen</DiscardProtocolButton>
                        <SaveProtocolButton onClick={() => saveProtocol(protocolEntry)}>Speichern</SaveProtocolButton>
                    </RowContainer>
                </RescueListColumnLayout >
            </RescueListRowLayout>
        </RescueListLayout>
    )
}

const RescueListLayout = styled.div`
    height: 100%;
`

const RescueListRowLayout = styled.div`
    display: flex;
    flex-direction: row;
    background: #9A8873;
    height: 100%;
`

const RescueListColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
`

const RowContainer = styled.div` 
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    margin-bottom: 10px;
`

const DatePickerRowContainer = styled.div` 
    display: flex;
    flex-direction: row;
    justify-content: center
`

const DatePickerLabel = styled.div`
    flex: 1;
    margin-left: 15px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    max-width: 200px;
`

const ProtocolLayout = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #7d6b52;
    color: beige;
    max-width: 500px;
`

const ProtocolTitle = styled.div`
    font-weight: 500;
    font-size: 25px;
    margin: 10px;
`

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`