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
import ProtocolEntry from '../widgets/Protocol/ProtocolEntry'

export default function MainPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })

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

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <ProtocolLayout isNotMobile={isNotMobile}>
                        <ProtocolTitle>Saisonübersicht (TODO: Region einfügen)</ProtocolTitle>
                        <ColumnContainer>
                            <ProtocolEntry entry="Anzahl Aufgebote" value={0} />
                            <ProtocolEntry entry="Gerettete Kitze" value={1} />
                            <ProtocolEntry entry="Verletzte Kitze" value={2} />
                            <ProtocolEntry entry="Markierte Kitze" value={3} />
                        </ColumnContainer>
                    </ProtocolLayout>
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

const ProtocolLayout = styled.div<{ isNotMobile: boolean }>`
    margin: 0px 10px 10px;
    margin-top: ${(props) => (props.isNotMobile ? "5vh" : "8vh")};
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