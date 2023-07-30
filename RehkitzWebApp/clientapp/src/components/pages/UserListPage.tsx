import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { UserContext } from '../../store/context'
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

    let navigate = useNavigate()
    useEffect(() => {
        const onMount = async () => {
            const usersListLocal = await fetchUsers()
            setLoadingUsers(false)
            dispatch_users({ type: 'get-users', usersListLocal })
        }
        onMount()
    }, [dispatch_users])

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'GET'
            });
            if (response.ok) {
                return await response.json();
            }                
            return [];
        } catch (error) {
            return [];
        }
    }

    const search = async () => {
    }

    const addNewUser = async () => {
        navigate(ROUTE_ADAPT_USER_PAGE)
    }

    let content;
    if (loadingUsers) {
        content = (<p><em>Ladet Benutzer... </em></p>);
    } else if (usersListLocal.length === 0) {
        content = (<p><em>Keine Benutzer gefunden.</em></p>);
    } else {
        content = usersListLocal.map(userEntry => (
            <User key={userEntry.userId} userId={userEntry.userId} />
        ));
    }

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <SearchInput onChange={search}
                        value={''}
                        isNotMobile={isNotMobile}
                        placeholder={"Suchen"}></SearchInput>
                    <PageTitle>Benutzerverwaltung</PageTitle>
                    <BlockLayout>
                        {isLargeScreen ? <UserEntryTitles /> : <></>}
                        {content}
                    </BlockLayout>
                    <NewUserButton>
                        <CreateNewUserButton onClick={() => addNewUser()}> Neuer Benutzer erstellen</CreateNewUserButton>
                    </NewUserButton>
                </RescueListColumnLayout >
            </RescueListRowLayout>
        </RescueListLayout>
    )
}

const RescueListLayout = styled.div`
    height: 100%;
`

const BlockLayout = styled.div`
    background: #7C6B57;
    margin: 1em; 
    padding: 1em;
    border-radius: 10px;
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
    width: 100%;
`

const SearchInput = styled.input<{ isNotMobile: boolean }>` 
    display: flex;
    align-self: flex-end;
    border-radius: 8px;
    width: 250px;
    font-size: 25px;
    background: #898472;
    color: #ffeccb;
    margin-top: ${(props) => (props.isNotMobile ? "1em" : "3em")};
    margin-right: ${(props) => (props.isNotMobile ? "2vh" : "1vh")};

    &::placeholder {
        color: #ffeccb; 
        opacity: 0.5;
    }
`

const PageTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: 500;
    font-size: 2em;
    margin: 10px;
    color: #ffeccb;
    @media (max-width: 700px) {
        margin-bottom: 1.25em;
    }
`

const NewUserButton = styled.div`
    display: flex;
    justify-content: center;
`