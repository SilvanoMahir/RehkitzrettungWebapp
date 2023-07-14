import { useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { DiscardProtocolButton, SaveProtocolButton } from '../controls/Button'
import { UserContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import { useNavigate } from 'react-router-dom'
import { ROUTE_USER_LIST_PAGE } from '../../App'
import ProtocolEntryForAdaptPage from '../widgets/Protocol/ProtocolEntryForAdaptPage'
import { Dropdown } from '../controls/Dropdown'

export default function AdaptUserPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })

    const [userLastName, setUserLastName] = useState('')
    const [userFirstName, setUserFirstName] = useState('')
    const [userDefinition, setUserDefinition] = useState('')
    const [userRegion, setUserRegion] = useState('')
    const [userFunction, setUserFunction] = useState('')
    const [username, setUsername] = useState('')
    const [userEMail, setUserEMail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const { usersListLocal, dispatch_users } = useContext(UserContext)


    let navigate = useNavigate()

    const discardUser = async () => {
        navigate(ROUTE_USER_LIST_PAGE)
    }

    const saveUser = async () => {
        const storageToken = localStorage.getItem('user_token');
        const response = await fetch('/api/authenticate/register-admin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                username: username,
                userEmail: userEMail,
                userpassword: userPassword,
                userDefinition: userDefinition,
                userFirstName: userFirstName,
                userLastName: userLastName,
                userRegion: userRegion,
            }),
        })
        if (response.ok) {
            const newUser = ({
                userId: 0,
                username: username,
                userMail: userEMail,
                userPassword: userPassword,
                userDefinition: userDefinition,
                userFirstName: userFirstName,
                userLastName: userLastName,
                userRegion: userRegion,
                userFunction: userFunction
            })
            dispatch_users({ type: 'add-user', usersListLocal, newUser })
            navigate(ROUTE_USER_LIST_PAGE)
        }
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
                        <ProtocolTitle>Neuer Benutzer</ProtocolTitle>
                        <ColumnContainer>
                            <ProtocolEntryForAdaptPage entry="Vorname" value={userFirstName} callbackFunction={setUserFirstName} />
                            <ProtocolEntryForAdaptPage entry="Name" value={userLastName} callbackFunction={setUserLastName} />
                            <ProtocolEntryForAdaptPage entry="Bezeichnung" value={userDefinition} callbackFunction={setUserDefinition} />
                            <Dropdown entry="Region" options={regions} onChange={setUserRegion} />
                            <Dropdown entry="Funktion" options={roles} onChange={setUserFunction} />
                            <ProtocolEntryForAdaptPage entry="Benutzername" value={username} callbackFunction={setUsername} />
                            <ProtocolEntryForAdaptPage entry="E-Mail" value={userEMail} callbackFunction={setUserEMail} />
                            <ProtocolEntryForAdaptPage entry="Passwort" value={userPassword} callbackFunction={setUserPassword} />
                        </ColumnContainer>
                    </ProtocolLayout>
                    <RowContainer>
                        <DiscardProtocolButton onClick={() => discardUser()}>Verwerfen</DiscardProtocolButton>
                        <SaveProtocolButton onClick={() => saveUser()}>Speichern</SaveProtocolButton>
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

const DatePickerRowContainer = styled.div` 
    display: flex;
    flex-direction: row;
    justify-content: center
`

const ProtocolLayout = styled.div<{ isNotMobile: boolean }>`
    margin: 0px 10px 10px;
    margin-top: ${(props) => (props.isNotMobile ? "5vh" : "8vh")};
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #7d6b52;
    color: beige;
    max-width: 500px;
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