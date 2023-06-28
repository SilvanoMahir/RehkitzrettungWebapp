import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { AppContext, UserContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'

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
            <div key={userEntry.ownerId}>
              <p>UserId: {userEntry.ownerId}</p>
              <p>First Name: {userEntry.userFirstName}</p>
              <p>Last Name: {userEntry.userLastName}</p>
            </div>
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
                    {content}
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

const RowContainer = styled.div` 
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    margin-bottom: 10px;
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

    &::placeholder {
        color: #fffecb; /* Change this to the desired color */
        opacity: 0.5;
    }
`