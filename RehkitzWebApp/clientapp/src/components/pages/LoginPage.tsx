import styled from 'styled-components'
import { LoginButton } from '../controls/Button'
import { useContext, useState } from 'react'
import { TextInput } from '../controls/TextInput'
import { TextInputPassword } from '../controls/TextInputPassword'
import LoginIcon from '../widgets/Login/LoginIcon'
import BackgroundIcon from '../widgets/Login/LoginBackground'
import { ROUTE_MAIN_PAGE } from '../../App'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from "react-icons/fa"
import { AppContext } from '../../store/context'
import { toast } from 'react-toastify'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { FadeLoader } from 'react-spinners'

export default function LoginPage() {
    const [inputUserName, setUserName] = useState('')
    const [inputPassword, setPassword] = useState('')
    const { dispatch_token } = useContext(AppContext)
    let navigate = useNavigate()
    const { promiseInProgress } = usePromiseTracker()

    const login = async () => {
        if (inputUserName === "" || inputPassword === "") {
            toast.error("Bitte Benutzername und Password einsetzen!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
        } else {
            trackPromise(
                fetchLogin()
            )
        }
    }

    const fetchLogin = async () => {
        const response = await fetch('/api/authenticate/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "username": inputUserName,
                "password": inputPassword
            }),
        })
        const { token } = await response.json()
        if (response.ok) {
            localStorage.setItem('user_token', token)
            dispatch_token({ type: 'set-token', value: token })
            navigate(ROUTE_MAIN_PAGE)
        } else {
            toast.error("Login fehlgeschlagen. Password oder Benutzername falsch", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
        }
    }

    return (
        <div>
            <BackgroundIcon />
            <LoginPageRowLayout>
                <LoginPageColumnLayout>
                    <LoginIcon />
                    <TitleText data-testid="login-anmelden-title">Anmelden</TitleText>
                    <TextInput onChange={setUserName}
                        value={inputUserName}
                        placeholder="Benutzername"></TextInput>
                    <TextInputPassword
                        placeholder="Passwort"
                        onChange={setPassword}
                        value={inputPassword} />
                    <RowContainer>
                        <LoginButton onClick={() => login()}>Anmelden <FaSignInAlt /></LoginButton>
                    </RowContainer>
                    <VersionText>v1.0.1</VersionText>
                    <LoadingBar>{promiseInProgress ? (<FadeLoader height={8} color='#ffeccb' />) : ('')} </LoadingBar>
                </LoginPageColumnLayout >
            </LoginPageRowLayout>
        </div>
    )
}

const LoginPageRowLayout = styled.div`
    display: flex; 
    justify-content: center;
    align-items: flex-start;
`

const LoginPageColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const RowContainer = styled.div` 
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    margin-bottom: 20px;
`

const TitleText = styled.div`
    color: #ffeccb;
    font-size: 30px;
    font-weight: bold;
`

const VersionText = styled.div`
    color: #ffeccb;
    font-size: 15px;
    margin-bottom: 20px;
`

const LoadingBar = styled.div`
    margin-bottom: 40px;
`