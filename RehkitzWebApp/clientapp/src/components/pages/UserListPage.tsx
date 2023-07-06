import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { AppContext, UserContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import User from '../widgets/Users/User'
import UserEntryTitles from '../widgets/Users/UserEntryTitles'

export default function UserListPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })

    const [loadingUsers, setLoadingUsers] = useState(true)
    const { usersListLocal, dispatch_users } = useContext(UserContext)
    const { token } = useContext(AppContext)

    useEffect(() => {
        const onMount = async () => {
            const usersListLocal = await fetchUsers()
            setLoadingUsers(false)
            dispatch_users({ type: 'get-users', usersListLocal})
        }
        onMount()
    }, [dispatch_users])

    const fetchUsers = async () => {
        const response = await fetch('/api/users', {
            method: 'GET'
        })
        if (response.ok) {
          return await response.json()
        }
        return []
      }

    const search = async () => {
    }

    let content;
    if (loadingUsers) {
        content = (<p><em>Laedt Protokolle... Bitte Seite aktualisieren, sobald ASP.NET Backend aufgestartet ist.</em></p>);
      } else if (usersListLocal.length === 0) {
        content = (<p><em>Keine Benutzer gefunden.</em></p>);
      } else {
        content = usersListLocal.map(userEntry => (
            <User key={userEntry.userId} userId={userEntry.userId} />
          ));
    }

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu/>}
            <RescueListRowLayout>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <SearchInput onChange={search}
                        value={''}
                        isNotMobile={isNotMobile}
                        placeholder={"Suchen"}></SearchInput>
                    <SiteTitle>Benutzerverwaltung</SiteTitle>
                    <BlockLayout>
                        {isNotMobile ? <UserEntryTitles entry={'NotMObile'}></UserEntryTitles>:<></>}
                        {content}
                    </BlockLayout>
                </RescueListColumnLayout >
            </RescueListRowLayout>
        </RescueListLayout>
    )
}

const RescueListLayout = styled.div`
    height: 100%;
`

const BlockLayout = styled.div`
    background: #7d6b52;
    margin: 1em; 
    padding: 1em;
    border-radius: 10px;
    @media (max-width: 426px) {
        background: transparent;
      }
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

const SearchInput = styled.input<{ isNotMobile: boolean }>` 
    display: flex;
    align-self: flex-end;
    border-radius: 8px;
    width: 250px;
    font-size: 25px;
    background: #898472;
    color: #fffecb;
    margin-top: ${(props) => (props.isNotMobile ? "5vh" : "8vh")};
    margin-right: ${(props) => (props.isNotMobile ? "2vh" : "1vh")};

    &::placeholder {
        color: #fffecb; /* Change this to the desired color */
        opacity: 0.5;
    }
`

const SiteTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: 500;
    font-size: 2em;
    margin: 10px;
    margin-bottom: 1.5em;
    color: #fffecb;
    @media (max-width: 426px) {
        margin-bottom: 0.25em;
      }
`