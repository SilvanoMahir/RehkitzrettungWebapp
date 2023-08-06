import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { AppContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import 'react-datepicker/dist/react-datepicker.css'
import InformationOverviewEntry from '../widgets/Information/InformationOverviewEntry'

export default function MyDataPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })

    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [role, setRole] = useState('')
    const [region, setRegion] = useState('')
    const [userFunction, setUserFunction] = useState('')
    const [mail, setMail] = useState('')

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
            // setUserName(userName)
            // setRegionName(userRegion)
            const protocolOverview = await fetchProtocolOverview(storageToken, userRegion)

            // setNumberOfProtocols(protocolOverview.numberOfProtocols)
            // setFoundFawns(protocolOverview.foundFawns)
            // setInjuredFawns(protocolOverview.injuredFawns)
            // setMarkedFawns(protocolOverview.markedFawns)
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

    const fetchProtocolOverview = async (storageToken: string | null, userRegion: string | undefined) => {
        const response = await fetch('/api/protocols/overview?' + new URLSearchParams({
            userRegion: userRegion!
        }), {
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

    return (
        <MyDataPageLayout>
            {!isNotMobile && <Menu />}
            <MyDataPageRowLayout>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <MyDataPageColumnLayout>
                    <PageTitle isNotMobile={isNotMobile}>Meine Daten</PageTitle>
                    <MyDataLayout isNotMobile={isNotMobile}>
                        <MyDataTitle>Benutzer {1}</MyDataTitle>
                        <ColumnContainer>
                            <InformationOverviewEntry entry="ID" value={2} />
                            <InformationOverviewEntry entry="Name, Vorname" value={3} />
                            <InformationOverviewEntry entry="Bezeichnung" value={4} />
                            <InformationOverviewEntry entry="Kanton/Region" value={5} />
                            <InformationOverviewEntry entry="Funktion" value={6} />
                            <InformationOverviewEntry entry="E-Mail" value={7} />
                        </ColumnContainer>
                    </MyDataLayout>
                </MyDataPageColumnLayout >
            </MyDataPageRowLayout>
        </MyDataPageLayout>
    )
}

const MyDataPageLayout = styled.div`
    height: 100%;
`

const MyDataPageRowLayout = styled.div`
    display: flex;
    flex-direction: row;
    background: #9A8873;
    height: 100%;
`

const MyDataPageColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const MyDataLayout = styled.div<{ isNotMobile: boolean }>`
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

const MyDataTitle = styled.div`
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