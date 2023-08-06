import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { AppContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import 'react-datepicker/dist/react-datepicker.css'
import InformationOverviewEntry from '../widgets/Information/InformationOverviewEntry'

export default function MyDataPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 700px)' })

    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [name, setName] = useState('')
    const [region, setRegion] = useState('')
    const [userFunction, setUserFunction] = useState('')
    const [mail, setMail] = useState('')

    const { dispatch_token } = useContext(AppContext)

    useEffect(() => {
        const onMount = async () => {
            const storageToken = localStorage.getItem('user_token')
            if (storageToken !== null) {
                dispatch_token({ type: 'set-token', value: storageToken })
            }
            const id = localStorage.getItem('user_id')
            const user = await fetchUser(storageToken, id)
            const { userId, userFirstName, userLastName, userMail, userFunction,
                userRegion, userName } = user
            setId(userId)
            setFirstName(userFirstName)
            setLastName(userLastName)
            setMail(userMail)
            setUserFunction(userFunction)
            setRegion(userRegion)
            setName(userName)
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

    return (
        <MyDataPageLayout>
            {!isNotMobile && <Menu />}
            <MyDataPageRowLayout isNotMobile={isNotMobile}>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <MyDataPageColumnLayout>
                    <PageTitle isNotMobile={isNotMobile}>Meine Daten</PageTitle>
                    <MyDataLayout isNotMobile={isNotMobile}>
                        <MyDataTitle>Benutzer {name}</MyDataTitle>
                        <ColumnContainer>
                            <InformationOverviewEntry entry="ID" value={id} />
                            <InformationOverviewEntry entry="Name, Vorname" value={`${lastName}, ${firstName}`} />
                            <InformationOverviewEntry entry="Bezeichnung" value={name} />
                            <InformationOverviewEntry entry="Kanton/Region" value={region} />
                            <InformationOverviewEntry entry="Funktion" value={userFunction} />
                            <InformationOverviewEntry entry="E-Mail" value={mail} />
                        </ColumnContainer>
                    </MyDataLayout>
                </MyDataPageColumnLayout>
            </MyDataPageRowLayout>
        </MyDataPageLayout>
    )
}

const MyDataPageLayout = styled.div`
    height: 100%;
`

const MyDataPageRowLayout = styled.div<{ isNotMobile: boolean }>`
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-left: ${({ isNotMobile }) => (isNotMobile ? "30%" : "none")};
`

const MyDataPageColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const MyDataLayout = styled.div<{ isNotMobile: boolean }>`
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

const MyDataTitle = styled.div`
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