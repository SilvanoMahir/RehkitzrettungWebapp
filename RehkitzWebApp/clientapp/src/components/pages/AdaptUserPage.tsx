import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { DeleteUserButton, DiscardUserButton, SaveProtocolButton } from '../controls/Button'
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
    const [userName, setUsername] = useState('')
    const [userMail, setUserEMail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [isNewUser, setIsNewUser] = useState(false)
    const [roles, setRoles] = useState<{ label: string; value: string; }[]>([])
    const [regions, setRegions] = useState<{ label: string; value: string; }[]>([])
    const { usersListLocal, dispatch_users } = useContext(UserContext)
    const { id } = useParams()

    useEffect(() => {
        const onMount = async () => {
            let data = usersListLocal.filter(users => users.userId.toString() === id)
            if (data.length === 0) {
                setIsNewUser(true)
            }
            else {
                const updateUser = await fetchUsers(id)
                setIsNewUser(false)
                const { userId, userFirstName, userLastName, userDefinition, userRegion,
                    userFunction, userName, userMail, userPassword } = updateUser

                setUserId(userId)
                setUserFirstName(userFirstName)
                setUserLastName(userLastName)
                setUserDefinition(userDefinition)
                setUserRegion(userRegion)
                setUserFunction(userFunction)
                setUsername(userName)
                setUserEMail(userMail)
                setUserPassword(userPassword)
            }
            const rolesData = await fetchUserRoles()
            const transformedRoles = rolesData.map((role: { roleName: any }) => ({
                label: role.roleName,
                value: role.roleName,
            }))
            setRoles(transformedRoles)

            const regionsData = await fetchRegions()
            const transformedRegions = regionsData.map((role: { regionName: any }) => ({
                label: role.regionName,
                value: role.regionName,
            }))
            setRegions(transformedRegions)
        }
        onMount()
    }, [usersListLocal, id])

    let navigate = useNavigate()

    const discardUser = async () => {
        navigate(ROUTE_USER_LIST_PAGE)
    }

    const saveUser = async () => {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                userName: userName,
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
            const newUser = ({
                userId: 0,
                userName: userName,
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
        } else if (response.status === 400) {
            response.json().then((errorData) => {
                if (Array.isArray(errorData) && errorData.length > 0) {
                    errorData.forEach((errorItem) => {
                        const errorMsg = errorItem.description
                        toast.error(errorMsg, {
                            position: toast.POSITION.TOP_CENTER,
                            containerId: 'LoginToaster',
                        })
                    })
                } else {
                    toast.error('An error occurred. Please try again later.', {
                        position: toast.POSITION.TOP_CENTER,
                        containerId: 'LoginToaster',
                    })
                }
            })
        } else {
            toast.error('An error occurred. Please try again later.', {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'LoginToaster',
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
                userName: userName,
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
        } else if (response.status === 400) {
            response.json().then((errorData) => {
                if (Array.isArray(errorData) && errorData.length > 0) {
                    errorData.forEach((errorItem) => {
                        const errorMsg = errorItem.description
                        toast.error(errorMsg, {
                            position: toast.POSITION.TOP_CENTER,
                            containerId: 'LoginToaster',
                        })
                    })
                } else {
                    toast.error('An error occurred. Please try again later.', {
                        position: toast.POSITION.TOP_CENTER,
                        containerId: 'LoginToaster',
                    })
                }
            })
        } else {
            toast.error('An error occurred. Please try again later.', {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'LoginToaster',
            })
        }
    }

    const deleteUser = async () => {
        const answer = window.confirm("Wirklich löschen?")
        if (answer) {
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

    const fetchUserRoles = async () => {
        const response = await fetch(`/api/users/roles`, {
            method: 'GET'
        })
        if (response.ok) {
            return await response.json()
        }
        return []
    }

    const fetchRegions = async () => {
        const response = await fetch(`/api/regions`, {
            method: 'GET'
        })
        if (response.ok) {
            return await response.json()
        }
        return []
    }

    return (
        <AdaptUserLayout>
            {!isNotMobile && <Menu />}
            <AdaptUserRowLayout isNotMobile={isNotMobile}>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <AdaptUserColumnLayout>
                    <UserLayout isNotMobile={isNotMobile}>
                        <UserTitle>{isNewUser ? 'Neuer Benutzer' : `Benutzer ${userDefinition}`}</UserTitle>
                        <ColumnContainer>
                            <ProtocolEntryForAdaptPage entry="Vorname" value={userFirstName} callbackFunction={setUserFirstName} />
                            <ProtocolEntryForAdaptPage entry="Name" value={userLastName} callbackFunction={setUserLastName} />
                            <ProtocolEntryForAdaptPage entry="Bezeichnung" value={userDefinition} callbackFunction={setUserDefinition} />
                            <Dropdown entry="Region" options={regions} value={userRegion} onChange={setUserRegion} />
                            <Dropdown entry="Funktion" options={roles} value={userFunction} onChange={setUserFunction} />
                            <ProtocolEntryForAdaptPage entry="Benutzername" value={userName} callbackFunction={setUsername} />
                            <ProtocolEntryForAdaptPage entry="E-Mail" value={userMail} callbackFunction={setUserEMail} />
                            <ProtocolEntryForAdaptPage entry="Passwort" value={userPassword} callbackFunction={setUserPassword} />
                        </ColumnContainer>
                    </UserLayout>
                    <RowContainer>
                        <DiscardUserButton onClick={() => discardUser()}>Verwerfen</DiscardUserButton>
                        {(!isNewUser) && <DeleteUserButton onClick={() => deleteUser()}>Löschen</DeleteUserButton>}
                        <SaveProtocolButton onClick={() => isNewUser ? saveUser() : updateUser()}>Speichern</SaveProtocolButton>
                    </RowContainer>
                </AdaptUserColumnLayout >
            </AdaptUserRowLayout>
        </AdaptUserLayout>
    )
}

const AdaptUserLayout = styled.div`
    height: 100%;
`

const AdaptUserRowLayout = styled.div<{ isNotMobile: boolean }>`
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-left: ${({ isNotMobile }) => (isNotMobile ? "30%" : "none")};
    @media (min-width: 1800px) {
        margin-left: 530px;
    }
`

const AdaptUserColumnLayout = styled.div`
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

const UserLayout = styled.div<{ isNotMobile: boolean }>`
    margin: 0px 10px 10px;
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #7c6b57;
    color: beige;
    max-width: 30em;
    border-radius: 10px;
    @media (min-width: 700px) {
        display: inline-block;
        width: 90%;
  	}
`

const UserTitle = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 25px;
    margin: 10px;
    color: #ffeccb;
`

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`