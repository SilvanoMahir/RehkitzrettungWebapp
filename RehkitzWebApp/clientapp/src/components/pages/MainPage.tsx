import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { AppContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import 'react-datepicker/dist/react-datepicker.css'
import ProtocolOverviewEntry from '../widgets/Protocol/ProtocolOverviewEntry'

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
            const userId = localStorage.getItem('user_id')
            const user = await fetchUser(storageToken, userId)
            const { userRegion, userName } = user
            setUserName(userName)
            setRegionName(userRegion)
            const protocolOverview = await fetchProtocolOverview(storageToken)

            setNumberOfProtocols(protocolOverview.numberOfProtocols)
            setFoundFawns(protocolOverview.foundFawns)
            setInjuredFawns(protocolOverview.injuredFawns)
            setMarkedFawns(protocolOverview.markedFawns)
        }
        onMount()
    }, [dispatch_token])

    const fetchUser = async (storageToken: string | null, id: string | null) => {
        const response = await fetch(`/api/users/${id}`, {
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
                    <PageTitle isNotMobile={isNotMobile}>Willkommen {userName}</PageTitle>
                    <ProtocolLayout isNotMobile={isNotMobile}>
                        <ProtocolTitle>Saisonübersicht {regionName}</ProtocolTitle>
                        <ColumnContainer>
                            <ProtocolOverviewEntry entry="Anzahl Aufgebote" value={numberOfProtocols} />
                            <ProtocolOverviewEntry entry="Gerettete Kitze" value={foundFawns} />
                            <ProtocolOverviewEntry entry="Verletzte Kitze" value={injuredFawns} />
                            <ProtocolOverviewEntry entry="Markierte Kitze" value={markedFawns} />
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
    margin-top: ${(props) => (props.isNotMobile ? "5vh" : "0vh")};
    padding: 20px 50px 30px 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #7d6b52;
    color: beige;
    max-width: 500px;
    border-radius: 10px;
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

const PageTitle = styled.div<{ isNotMobile: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: 500;
    font-size: 2em;
    margin: 10px;
    color: #fffecb;
    margin-top: ${(props) => (props.isNotMobile ? "5vh" : "8vh")};
    @media (max-width: 700px) {
        margin-bottom: 1.25em;
    }
`