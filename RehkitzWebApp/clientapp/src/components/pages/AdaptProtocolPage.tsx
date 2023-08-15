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
import { toast } from 'react-toastify'

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
    const [regions, setRegions] = useState<{ label: string; value: string; }[]>([])
    const [areaSizes, setAreaSizes] = useState<{ label: string; value: string; }[]>([])
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
                const dateObject = new Date(Date.parse(date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$2/$1/$3')))
                setDate(dateObject)
                setFoundFawns(foundFawns.toString())
                setMarkedFawns(markedFawns.toString())
                setRemark(remark)
                setPilotFullName(pilotFullName)
                setRegionName(regionName)
                setAreaSize(areaSize)
                setInjuredFawns(injuredFawns.toString())
            }
            const regionsData = await fetchRegions()
            const transformedRegions = regionsData.map((role: { regionName: any }) => ({
                label: role.regionName,
                value: role.regionName,
            }))
            setRegions(transformedRegions)

            const areaSizesData = await fetchAreaSizes()
            const transformedAreaSizes = areaSizesData.map((role: { areaSize: any }) => ({
                label: role.areaSize,
                value: role.areaSize,
            }))
            setAreaSizes(transformedAreaSizes)
        }
        onMount()
    }, [protocolsListLocal, id])

    const isValidNumericString = (string: string) => {
        return /^\d+$/.test(string)
    }

    const discardProtocol = async () => {
        navigate(ROUTE_RESCUE_LIST_PAGE)
    }

    const saveProtocol = async () => {
        if (clientFullName === "" || localName === "" || foundFawns === "" || markedFawns === ""
            || pilotFullName === "" || regionName === "" || areaSize === "" || injuredFawns === "") {
            toast.error("Bitte alle Felder ausfüllen!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
            return
        }
        if (!isValidNumericString(injuredFawns) || !isValidNumericString(markedFawns) || !isValidNumericString(foundFawns)) {
            toast.error("Felder gefundene, verletzte oder markierte Kitze sind keine Zahlen!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
            return
        }
        if (remark.length > 250) {
            toast.error("Bemerkung zu lang! Mehr als 250 Zeichen sind nicht erlaubt.", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
            return
        }
        const storageToken = localStorage.getItem('user_token')
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
            navigate(ROUTE_RESCUE_LIST_PAGE)
            toast.success("Protokoll erfolgreich hinzugefügt!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
        }
    }

    const updateProtocol = async () => {
        if (clientFullName === "" || localName === "" || foundFawns === "" || markedFawns === ""
            || pilotFullName === "" || regionName === "" || areaSize === "" || injuredFawns === "") {
            toast.error("Bitte alle Felder ausfüllen!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
            return
        }
        if (!isValidNumericString(injuredFawns) || !isValidNumericString(markedFawns) || !isValidNumericString(foundFawns)) {
            toast.error("Felder gefundene, verletzte oder markierte Kitze sind keine Zahlen!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
            return
        }
        if (remark.length > 250) {
            toast.error("Bemerkung zu lang! Mehr als 250 Zeichen sind nicht erlaubt.", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
            return
        }
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
            navigate(ROUTE_RESCUE_LIST_PAGE)
            toast.success("Protokoll erfolgreich angepasst!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
        }
    }

    const fetchRegions = async () => {
        const response = await fetch(`/api/regions`, {
            method: 'GET'
        })
        if (response.ok) {
            return await response.json()
        }
        return []
    }

    const fetchAreaSizes = async () => {
        const response = await fetch(`/api/area `, {
            method: 'GET'
        })
        if (response.ok) {
            return await response.json()
        }
        return []
    }

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout isNotMobile={isNotMobile}>
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
                                    <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd.MM.yyyy" />
                                </DatePickerControl>
                            </DatePickerRowContainer>
                            <Dropdown entry="Fläche" options={areaSizes} value={areaSize} onChange={setAreaSize} />
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

const RescueListRowLayout = styled.div<{ isNotMobile: boolean }>`
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-left: ${({ isNotMobile }) => (isNotMobile ? "30%" : "none")};
    @media (min-width: 1800px) {
        margin-left: 530px;
    }
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
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: end;
    line-height: 50px;
    color: #ffeccb;
    @media (min-width: 1400px) {
        font-size: 1.25em;
    }
`

const ProtocolLayout = styled.div<{ isNotMobile: boolean }>`
    margin: 0px 10px 10px;
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #7c6b57;
    color: beige;
    max-width: 500px;
    border-radius: 10px;
`

const ProtocolTitle = styled.div`
    font-weight: 500;
    font-size: 25px;
    margin: 10px;
    color: #ffeccb;
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
    padding-left: 1.25em;
`