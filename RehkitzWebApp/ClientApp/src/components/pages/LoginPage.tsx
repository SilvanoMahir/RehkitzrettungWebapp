import styled from 'styled-components/macro'
import { LoginButton } from '../controls/Button'
import { useState } from 'react'
import { TextInput } from 'components/controls/TextInput'
import LoginIcon from "../widgets/LoginIcon"
import { ROUTE_RESCUE_LIST_PAGE } from 'App'
import { useNavigate } from 'react-router-dom'


export default function RescueListPage() {
    const [inputUserName, setUserName] = useState('')
    const [inputPassword, setPassword] = useState('')
    const [token, setToken] = useState('')
    let navigate = useNavigate()

    const login = async () => {
        const response = await fetch('/api/Authenticate/login', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              "username":inputUserName,
              "password":inputPassword
            }),
          })
          const {token} = await response.json() 
          setToken(token)
          if (token !== ''){
            navigate(ROUTE_RESCUE_LIST_PAGE)
          }
    }

    return (
        <LoginPageRowLayout>
            <LoginPageColumnLayout>
            <LoginIcon />
                <TextInput onChange={setUserName}
                    value={inputUserName}
                    placeholder="Benutzername"></TextInput>
                <TextInput onChange={setPassword}
                    value={inputPassword}
                    placeholder="Passwort"></TextInput>
                <RowContainer>
                    <LoginButton onClick={() => login()}>Anmelden</LoginButton>
                </RowContainer>
            </LoginPageColumnLayout >
        </LoginPageRowLayout>
    )
}

const LoginPageRowLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: #9A8873;
    height: 100vh;
`

const LoginPageColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const RowContainer = styled.div` 
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    margin-bottom: 20px;
`