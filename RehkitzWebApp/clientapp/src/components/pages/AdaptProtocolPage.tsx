import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { DiscardProtocolButton, SaveProtocolButton } from '../controls/Button'
import { ProtocolsContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTE_RESCUE_LIST_PAGE } from '../../App'
import ProtocolEntryForAdaptPage from '../widgets/Protocol/ProtocolEntryForAdaptPage'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { Dropdown } from '../controls/Dropdown'

export default function AdaptProtocolPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 700px)' })

    const [protocolCode, setProtocolCode] = useState('')
    const [clientFullName, setClientFullName] = useState('')
    const [localName, setLocalName] = useState('')
    const [date, setDate] = useState<Date | null>(new Date())
    const [foundFawns, setFoundFawns] = useState('')
    const [markedFawns, setMarkedFawns] = useState('')
    const [remark, setRemark] = useState('')
    const [pilotFullName, setPilotFullName] = useState('')
    const [regionName, setRegionName] = useState('')
    const [areaSize, setAreaSize] = useState('')
    const [injuredFawns, setInjuredFawns] = useState('')
    const [isNewProtocol, setIsNewProtocol] = useState(false)
    const { protocolsListLocal, dispatch } = useContext(ProtocolsContext)
    let navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const onMount = async () => {
            let data = protocolsListLocal.filter(protocols => protocols.protocolId.toString() === id)
            if (data.length === 0) {
                setIsNewProtocol(true)
            }
            else {
                setIsNewProtocol(false)
                const { protocolCode, clientFullName, localName, date, foundFawns,
                    markedFawns, remark, pilotFullName, regionName, areaSize,
                    injuredFawns } = data[0]
                setProtocolCode(protocolCode)
                setClientFullName(clientFullName)
                setLocalName(localName)
                setDate(new Date(date))
                setFoundFawns(foundFawns.toString())
                setMarkedFawns(markedFawns.toString())
                setRemark(remark)
                setPilotFullName(pilotFullName)
                setRegionName(regionName)
                setAreaSize(areaSize)
                setInjuredFawns(injuredFawns.toString())
            }
        }
        onMount()
    }, [protocolsListLocal, id])

    const discardProtocol = async () => {
        navigate(ROUTE_RESCUE_LIST_PAGE)
    }

    const saveProtocol = async () => {
        const storageToken = localStorage.getItem('user_token');
        const response = await fetch('/api/protocols', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${storageToken}`,
            },
            body: JSON.stringify({
                ProtocolCode: protocolCode,
                ClientFullName: clientFullName,
                LocalName: localName,
                Date: date,
                FoundFawns: parseInt(foundFawns),
                MarkedFawns: parseInt(markedFawns),
                Remark: remark,
                PilotFullName: pilotFullName,
                RegionName: regionName,
                AreaSize: areaSize,
                InjuredFawns: parseInt(injuredFawns),
            })
        })
        if (response.ok) {
            const dateAsString: string = date?.toDateString()!
            const newProtocol = ({
                protocolId: '1',
                protocolCode: protocolCode,
                clientFullName: clientFullName,
                localName: localName,
                date: dateAsString,
                foundFawns: parseInt(foundFawns),
                markedFawns: parseInt(markedFawns),
                remark: remark,
                pilotFullName: pilotFullName,
                regionName: regionName,
                areaSize: areaSize,
                injuredFawns: parseInt(injuredFawns),
            })

            dispatch({ type: 'add-protocols', protocolsListLocal, newProtocol })
        }
        navigate(ROUTE_RESCUE_LIST_PAGE)
    }

    const updateProtocol = async () => {
        const storageToken = localStorage.getItem('user_token')
        const response = await fetch(`${`/api/protocols`}/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${storageToken}`,
            },
            body: JSON.stringify({
                protocolId: id,
                protocolCode: protocolCode,
                clientFullName: clientFullName,
                localName: localName,
                date: date,
                foundFawns: parseInt(foundFawns),
                markedFawns: parseInt(markedFawns),
                remark: remark,
                pilotFullName: pilotFullName,
                regionName: regionName,
                areaSize: areaSize,
                injuredFawns: parseInt(injuredFawns),
            }),
        })
        if (response.ok) {
            dispatch({ type: 'update-protocols', protocolsListLocal })
        }
        navigate(ROUTE_RESCUE_LIST_PAGE)
    }

    const regions = [
        { label: 'Tasna', value: 'Tasna' },
        { label: 'Valsot', value: 'Valsot' },
    ];

    const sizes = [
        { label: '<0.5ha', value: '<0.5ha' },
        { label: '<1.5ha', value: '<1.5ha' },
        { label: '>1.5ha', value: '>1.5ha' },
    ];

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <ProtocolLayout isNotMobile={isNotMobile}>
                    <ProtocolTitle>{isNewProtocol ? 'Neues Protokoll' : `${clientFullName}`}</ProtocolTitle>                        
                        <ColumnContainer>
                            <ProtocolEntryForAdaptPage entry="Auftraggeber" value={clientFullName} callbackFunction={setClientFullName} />
                            <ProtocolEntryForAdaptPage entry="Pilot" value={pilotFullName} callbackFunction={setPilotFullName} />
                            <ProtocolEntryForAdaptPage entry="Lokalname" value={localName} callbackFunction={setLocalName} />
                            <Dropdown entry="Region" options={regions} value={regionName} onChange={setRegionName} />
                            <DatePickerRowContainer>
                                <DatePickerLabel>Datum</DatePickerLabel>
                                <DatePickerControl>
                                    <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
                                </DatePickerControl>
                            </DatePickerRowContainer>
                            <Dropdown entry="Fläche" options={sizes} value={areaSize} onChange={setAreaSize} />
                            <ProtocolEntryForAdaptPage entry="Gefundene Kitze" value={foundFawns} callbackFunction={setFoundFawns} />
                            <ProtocolEntryForAdaptPage entry="Verletzte Kitze" value={injuredFawns} callbackFunction={setInjuredFawns} />
                            <ProtocolEntryForAdaptPage entry="Markierte Kitze" value={markedFawns} callbackFunction={setMarkedFawns} />
                            <ProtocolEntryForAdaptPage entry="Bemerkung" value={remark} callbackFunction={setRemark} />
                        </ColumnContainer>
                    </ProtocolLayout>
                    <RowContainer>
                        <DiscardProtocolButton onClick={() => discardProtocol()}>Verwerfen</DiscardProtocolButton>
                        <SaveProtocolButton onClick={() => isNewProtocol ? saveProtocol() : updateProtocol()}>Speichern</SaveProtocolButton>
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
    height: 100%;
`

const RescueListColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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
    line-height: 50px;
    color: #fffecb;
    @media (min-width: 1400px) {
        font-size: 1.25em;
    }
`

const ProtocolLayout = styled.div<{ isNotMobile: boolean }>`
    margin: 0px 10px 10px;
    margin-top: ${(props) => (props.isNotMobile ? "5vh" : "8vh")};
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #9A8873;
    color: beige;
    max-width: 500px;
    border-radius: 10px;
`

const ProtocolTitle = styled.div`
    font-weight: 500;
    font-size: 25px;
    margin: 10px;
    color: #fffecb;
`

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const DatePickerControl = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
`