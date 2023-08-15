import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { AppContext, UserContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import User from '../widgets/Users/User'
import UserEntryTitles from '../widgets/Users/UserEntryTitles'
import { CreateNewUserButton } from '../controls/Button'
import { ROUTE_ADAPT_USER_PAGE } from '../../App'
import { useNavigate } from 'react-router-dom'

export default function UserListPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 700px)' })
    const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' })
    
    const [loadingUsers, setLoadingUsers] = useState(true)
    const { usersListLocal, dispatch_users } = useContext(UserContext)
    const { dispatch_token } = useContext(AppContext)
    let navigate = useNavigate()
    
    useEffect(() => {
        const onMount = async () => {
            const storageToken = localStorage.getItem('user_token')
            if (storageToken !== null) {
                dispatch_token({ type: 'set-token', value: storageToken })
            }
            const usersListLocal = await fetchUsers(storageToken)
            setLoadingUsers(false)
            dispatch_users({ type: 'get-users', usersListLocal })
        }
        onMount()
    }, [dispatch_users, dispatch_token])

    const fetchUsers = async (storageToken: string | null) => {
        try {
            const response = await fetch('/api/users', {
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
        } catch (error) {
            return []
        }
    }

    const search = async () => {
    }

    const addNewUser = async () => {
        navigate(ROUTE_ADAPT_USER_PAGE)
    }

    let content
    if (loadingUsers) {
        content = (<p><em>Lädt Benutzer... </em></p>)
    } else if (usersListLocal.length === 0) {
        content = (<p><em>Keine Benutzer gefunden.</em></p>)
    } else {
        content = usersListLocal.map(userEntry => (
            <User key={userEntry.userId} userId={userEntry.userId} />
        ))
    }

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout isNotMobile={isNotMobile}>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <SearchInput onChange={search}
                        value={''}
                        isNotMobile={isNotMobile}
                        placeholder={"Suchen"}></SearchInput>
                    <TitleBlock>
                        <PageTitle>Benutzerverwaltung</PageTitle>
                        <NewUserButton>
                            <CreateNewUserButton onClick={() => addNewUser()}> Neuer Benutzer erstellen</CreateNewUserButton>
                        </NewUserButton>
                    </TitleBlock>
                    <UserListBlock>
                        {isLargeScreen ? <UserEntryTitles /> : <></>}
                        {content}
                    </UserListBlock>
                </RescueListColumnLayout >
            </RescueListRowLayout>
        </RescueListLayout>
    )
}

const RescueListLayout = styled.div`
    height: 100%;
`

const UserListBlock = styled.div`
    background: #7c6b57;
    margin: 1em; 
    padding: 1em;
    border-radius: 10px;
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
    width: 100%;
`

const SearchInput = styled.input<{ isNotMobile: boolean }>` 
    display: flex;
    align-self: flex-end;
    border: 2px solid #7c6b57; 
    border-radius: 8px;
    width: 250px;
    font-size: 25px;
    background: #898472;
    color: #ffeccb;
    margin-top: ${({ isNotMobile }) => (isNotMobile ? "1em" : "3em")};
    margin-right: ${({ isNotMobile }) => (isNotMobile ? "2vh" : "1vh")};
    &::placeholder {
        color: #ffeccb; 
        opacity: 0.5;
    }
`

const PageTitle = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 2em;
    color: #ffeccb;
    @media (min-width: 700px) {
        margin-left: 0px;
    }
`

const NewUserButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: 1000px) {
        align-items: flex-end;
    }
`

const TitleBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: 1000px) {
        align-items: stretch;
    }
`
