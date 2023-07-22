import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { DeleteUserButton, DiscardProtocolButton, DiscardUserButton, SaveProtocolButton } from '../controls/Button'
import { UserContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTE_USER_LIST_PAGE } from '../../App'
import ProtocolEntryForAdaptPage from '../widgets/Protocol/ProtocolEntryForAdaptPage'
import { Dropdown } from '../controls/Dropdown'
import { toast } from 'react-toastify'

export default function AdaptUserPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 700px)' })

    const [userId, setUserId] = useState(0)
    const [userLastName, setUserLastName] = useState('')
    const [userFirstName, setUserFirstName] = useState('')
    const [userDefinition, setUserDefinition] = useState('')
    const [userRegion, setUserRegion] = useState('')
    const [userFunction, setUserFunction] = useState('')
    const [username, setUsername] = useState('')
    const [userMail, setUserEMail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [isNewUser, setIsNewUser] = useState(false)
    const { usersListLocal, dispatch_users } = useContext(UserContext)
    const { id } = useParams()

    useEffect(() => {
        const onMount = async () => {
            let data = usersListLocal.filter(protocols => protocols.userId.toString() === id)
            if (data.length === 0) {
                setIsNewUser(true)
            }
            else {
                const updateUser = await fetchUsers(id);
                setIsNewUser(false)
                const { userId, userFirstName, userLastName, userDefinition, userRegion,
                    userFunction, username, userMail, userPassword} = updateUser

                setUserId(userId)
                setUserFirstName(userFirstName)
                setUserLastName(userLastName)
                setUserDefinition(userDefinition)
                setUserRegion(userRegion)
                setUserFunction(userFunction)
                setUsername(username)
                setUserEMail(userMail)
                setUserPassword(userPassword)
            }
        }
        onMount()
    }, [usersListLocal, id])

    let navigate = useNavigate()

    const discardUser = async () => {
        navigate(ROUTE_USER_LIST_PAGE)
    }

    const saveUser = async () => {
        const storageToken = localStorage.getItem('user_token');
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                username: username,
                userMail: userMail,
                userpassword: userPassword,
                userDefinition: userDefinition,
                userFirstName: userFirstName,
                userLastName: userLastName,
                userRegion: userRegion,
                userFunction: userFunction
            }),
        })
        if (response.ok) {
            const newUser = ({
                userId: 0,
                username: username,
                userMail: userMail,
                userPassword: userPassword,
                userDefinition: userDefinition,
                userFirstName: userFirstName,
                userLastName: userLastName,
                userRegion: userRegion,
                userFunction: userFunction
            })
            dispatch_users({ type: 'add-user', usersListLocal, newUser })
            navigate(ROUTE_USER_LIST_PAGE)
            toast.success("Benutzer erfolgreich hinzugefügt!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'LoginToaster'
            })
        }
    }

    const updateUser = async () => {
        const storageToken = localStorage.getItem('user_token')
        const response = await fetch(`${`/api/users`}/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${storageToken}`,
            },
            body: JSON.stringify({
                userId: id,
                username: username,
                userMail: userMail,
                userPassword: userPassword,
                userDefinition: userDefinition,
                userFirstName: userFirstName,
                userLastName: userLastName,
                userRegion: userRegion,
                userFunction: userFunction
            }),
        })
        if (response.ok) {
            dispatch_users({ type: 'update-users', usersListLocal })
            navigate(ROUTE_USER_LIST_PAGE)
            toast.success("Benutzer erfolgreich angepasst!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'LoginToaster'
            })
        }
    }

    const deleteUser = async () => {
        const answer = window.confirm("Wirklich löschen?")
        if (answer){
        const storageToken = localStorage.getItem('user_token')
        const response = await fetch(`${`/api/users`}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            }
        })
        if (response.ok) {
            dispatch_users({ type: 'delete-user', usersListLocal, userId })
            navigate(ROUTE_USER_LIST_PAGE)
            toast.success("Benutzer erfolgreich gelöscht!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'LoginToaster'
            })
        }
    }
    }

    const fetchUsers = async (id: string | undefined) => {
        const response = await fetch(`/api/users/${id}`, {
            method: 'GET'
        })
        if (response.ok) {
            return await response.json()
        }
        return []
    }

    const regions = [
        { label: 'Tasna', value: 'Tasna' },
        { label: 'Valsot', value: 'Valsot' },
    ];

    const roles = [
        { label: 'Admin', value: 'Admin' },
        { label: 'Benutzer', value: 'Benutzer' },
    ];

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <ProtocolLayout isNotMobile={isNotMobile}>
                        <ProtocolTitle>{isNewUser ? 'Neuer Benutzer' : `Benutzer ${userDefinition}`}</ProtocolTitle>                        
                        <ColumnContainer>
                            <ProtocolEntryForAdaptPage entry="Vorname" value={userFirstName} callbackFunction={setUserFirstName} />
                            <ProtocolEntryForAdaptPage entry="Name" value={userLastName} callbackFunction={setUserLastName} />
                            <ProtocolEntryForAdaptPage entry="Bezeichnung" value={userDefinition} callbackFunction={setUserDefinition} />
                            <Dropdown entry="Region" options={regions} value={userRegion} onChange={setUserRegion} />
                            <Dropdown entry="Funktion" options={roles} value={userFunction} onChange={setUserFunction} />
                            <ProtocolEntryForAdaptPage entry="Benutzername" value={username} callbackFunction={setUsername} />
                            <ProtocolEntryForAdaptPage entry="E-Mail" value={userMail} callbackFunction={setUserEMail} />
                            <ProtocolEntryForAdaptPage entry="Passwort" value={userPassword} callbackFunction={setUserPassword} />
                        </ColumnContainer>
                    </ProtocolLayout>
                    <RowContainer>
                        <DiscardUserButton onClick={() => discardUser()}>Verwerfen</DiscardUserButton>
                        {(!isNewUser) && <DeleteUserButton onClick={() => deleteUser()}>Löschen</DeleteUserButton>}
                        <SaveProtocolButton onClick={() => isNewUser ? saveUser() : updateUser()}>Speichern</SaveProtocolButton>
                    </RowContainer>
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
    height: 100%;
`

const RescueListColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

const RowContainer = styled.div` 
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    margin-bottom: 10px;
`

const ProtocolLayout = styled.div<{ isNotMobile: boolean }>`
    margin: 0px 10px 10px;
    margin-top: ${(props) => (props.isNotMobile ? "1em" : "5em")};
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #9A8873;
    color: beige;
    max-width: 30em;
    border-radius: 10px;
    @media (min-width: 700px) {
        display: inline-block;
        width: 90%;
  	}
    @media (min-width: 1200px) {
        max-width: 40em;
    }
`

const ProtocolTitle = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 25px;
    margin: 10px;
    color: #fffecb;
`

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`