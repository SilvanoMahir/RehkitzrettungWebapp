import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { AppContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import 'react-datepicker/dist/react-datepicker.css'
import InformationOverviewEntry from '../widgets/Information/InformationOverviewEntry'
import { toast } from 'react-toastify'
import { fetchUser } from './MyDataPage'


export default function MainPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 700px)' })

    const [userName, setUserName] = useState('')
    const [districtName, setDistrictName] = useState('')
    const [numberOfProtocols, setNumberOfProtocols] = useState(0)
    const [foundFawns, setFoundFawns] = useState(0)
    const [injuredFawns, setInjuredFawns] = useState(0)
    const [markedFawns, setMarkedFawns] = useState(0)

    const { dispatch_token } = useContext(AppContext)

    useEffect(() => {
        const onMount = async () => {
            const storageToken = localStorage.getItem('user_token')
            if (storageToken !== null) {
                dispatch_token({ type: 'set-token', value: storageToken })
            }
            const userId = localStorage.getItem('user_id')
            //const decodedToken = jwt_decode(storageToken as string)
            //const secretKey = 'JWT:Secret'
            //console.log(userId)
            const user = await fetchUser(storageToken, userId)
            const { userName } = user
            const { numberOfProtocols, foundFawns, injuredFawns, markedFawns, districtName } = await fetchProtocolOverview(storageToken)
            setUserName(userName)
            setNumberOfProtocols(numberOfProtocols)
            setFoundFawns(foundFawns)
            setInjuredFawns(injuredFawns)
            setMarkedFawns(markedFawns)
            setMarkedFawns(markedFawns)
            setDistrictName(districtName)
        }
        onMount()
    }, [dispatch_token])

    const fetchProtocolOverview = async (storageToken: string | null) => {
        const response = await fetch('/api/protocols/overview', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${storageToken}`,
            }
        })
        if (response.ok) {
            return await response.json()
        } else if (response.status === 500) {
            response.json().then((errorData) => {
                if (Array.isArray(errorData) && errorData.length > 0) {
                    errorData.forEach((errorItem) => {
                        const errorMsg = errorItem.description
                        toast.error(errorMsg, {
                            position: toast.POSITION.TOP_CENTER,
                            containerId: 'ToasterNotification',
                        })
                        return []
                    })
                } else {
                    toast.error('Ein Fehler ist aufgetreten! Bitte probieren Sie es später nochmals.', {
                        position: toast.POSITION.TOP_CENTER,
                        containerId: 'ToasterNotification',
                    })
                    return []
                }
            })
        }
    }

    return (
        <MainPageLayout>
            {!isNotMobile && <Menu />}
            <MainPageRowLayout isNotMobile={isNotMobile}>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <MainPageColumnLayout>
                    <PageTitle isNotMobile={isNotMobile}>Willkommen {userName}</PageTitle>
                    <InformationOverviewLayout isNotMobile={isNotMobile}>
                        <InformationOverviewTitle>Saisonübersicht {districtName}</InformationOverviewTitle>
                        <ColumnContainer>
                            <InformationOverviewEntry entry="Anzahl Aufgebote" value={numberOfProtocols} />
                            <InformationOverviewEntry entry="Gerettete Kitze" value={foundFawns} />
                            <InformationOverviewEntry entry="Verletzte Kitze" value={injuredFawns} />
                            <InformationOverviewEntry entry="Markierte Kitze" value={markedFawns} />
                        </ColumnContainer>
                    </InformationOverviewLayout>
                </MainPageColumnLayout>
            </MainPageRowLayout>
        </MainPageLayout>
    )
}

const MainPageLayout = styled.div`
    height: 100%;
`

const MainPageRowLayout = styled.div<{ isNotMobile: boolean }>`
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-left: ${({ isNotMobile }) => (isNotMobile ? "30%" : "none")};
`

const MainPageColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const InformationOverviewLayout = styled.div<{ isNotMobile: boolean }>`
    margin: 0px 10px 10px;
    margin-top: ${({ isNotMobile }) => (isNotMobile ? "5vh" : "0vh")};
    padding: 20px 50px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #7c6b57;
    max-width: 500px;
    border-radius: 10px;
`

const InformationOverviewTitle = styled.div`
    font-weight: 500;
    font-size: 2em;
    margin: 10px;
    color: #ffeccb;
`

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 50px 10px;
`

const PageTitle = styled.div<{ isNotMobile: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: 500;
    font-size: 2em;
    margin: 10px;
    color: #ffeccb;
    margin-top: ${({ isNotMobile }) => (isNotMobile ? "5vh" : "12vh")};
    @media (max-width: 700px) {
        margin-bottom: 1.25em;
    }
`