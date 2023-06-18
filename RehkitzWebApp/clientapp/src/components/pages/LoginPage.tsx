import styled from 'styled-components/macro'
import { LoginButton } from '../controls/Button'
import { useContext, useState } from 'react'
import { TextInput, TextInputPassword } from '../controls/TextInput'
import LoginIcon from "../widgets/LoginIcon"
import BackgroundIcon from "../widgets/LoginBackground"
import { ROUTE_RESCUE_LIST_PAGE } from '../../App'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from "react-icons/fa"
import { AppContext } from '../../store/context'

export default function RescueListPage() {
    const [inputUserName, setUserName] = useState('')
    const [inputPassword, setPassword] = useState('')
    const { dispatch } = useContext(AppContext)
    let navigate = useNavigate()

    const login = async () => {
        const response = await fetch('/api/authenticate/login', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              "username":inputUserName,
              "password":inputPassword
            }),
          })
          const {token} = await response.json() 
          if (response.ok){
            localStorage.setItem('user_token', token);
            dispatch({type: 'set-token', value: token})
            navigate(ROUTE_RESCUE_LIST_PAGE)
          }
    }

    return (
        <div>
        <BackgroundIcon />
        <LoginPageRowLayout>
            <LoginPageColumnLayout>
            <LoginIcon />
            <div><TitleText data-testid="login-anmelden-title">Anmelden</TitleText></div>
                <TextInput onChange={setUserName}
                    value={inputUserName}
                    placeholder="Benutzername"></TextInput>
                <TextInputPassword onChange={setPassword}
                    value={inputPassword}
                    placeholder="Passwort"></TextInputPassword>
                <RowContainer>
                    <LoginButton onClick={() => login()}>Anmelden <FaSignInAlt/></LoginButton>
                </RowContainer>
                <div><VersionText>v0.3</VersionText></div>
            </LoginPageColumnLayout >
        </LoginPageRowLayout>
        </div>
    )
}

const LoginPageRowLayout = styled.div`
    display: flex;
    justify-content: center;
    background: #9A8873;
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
    color: #fffecb;
    font-size: 30px;
    font-weight: bold;
`

const VersionText = styled.div`
    color: #fffecb;
    font-size: 15px;
`