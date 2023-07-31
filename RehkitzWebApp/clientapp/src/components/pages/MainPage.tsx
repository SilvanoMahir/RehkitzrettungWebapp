import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { DiscardProtocolButton, SaveProtocolButton } from '../controls/Button'
import { AppContext, ProtocolsContext } from '../../store/context'
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

    const [userName, setUserName] = useState('')
    const [regionName, setRegionName] = useState('')
    const [numberOfProtocols, setNumberOfProtocols] = useState(0)
    const [foundFawns, setFoundFawns] = useState(0)
    const [injuredFawns, setInjuredFawns] = useState(0)
    const [markedFawns, setMarkedFawns] = useState(0)

    const { dispatch_token } = useContext(AppContext)

    useEffect(() => {
        const onMount = async () => {
            //token handling can probably be optimized
            const storageToken = localStorage.getItem('user_token')
            if (storageToken !== null) {
                dispatch_token({ type: 'set-token', value: storageToken })
            }
            setUserName('Some user')
            setRegionName('Some region')
            const protocolOverview = await fetchProtocolOverview(storageToken)

            setNumberOfProtocols(protocolOverview.numberOfProtocols)
            setFoundFawns(protocolOverview.foundFawns)
            setInjuredFawns(protocolOverview.injuredFawns)
            setMarkedFawns(protocolOverview.markedFawns)
        }
        onMount()
    }, [dispatch_token])

    const fetchProtocolOverview = async (storageToken: string | null) => {
        const response = await fetch('/api/protocols/overview', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${storageToken}`,
            },
        })
        if (response.ok) {
            return await response.json()
        }
        return []
    }

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <PageTitle>Willkommen {userName}</PageTitle>
                    <ProtocolLayout isNotMobile={isNotMobile}>
                        <ProtocolTitle>Saisonübersicht {regionName}</ProtocolTitle>
                        <ColumnContainer>
                            <ProtocolEntry entry="Anzahl Aufgebote" value={numberOfProtocols} />
                            <ProtocolEntry entry="Gerettete Kitze" value={foundFawns} />
                            <ProtocolEntry entry="Verletzte Kitze" value={injuredFawns} />
                            <ProtocolEntry entry="Markierte Kitze" value={markedFawns} />
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
    align-items: center;
    width: 100%;
`

const ProtocolLayout = styled.div<{ isNotMobile: boolean }>`
    margin: 0px 10px 10px;
    margin-top: ${(props) => (props.isNotMobile ? "5vh" : "8vh")};
    padding: 20px 50px 30px 50px;
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

const PageTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: 500;
    font-size: 2em;
    margin: 10px;
    color: #fffecb;
    @media (max-width: 700px) {
        margin-bottom: 1.25em;
    }
`