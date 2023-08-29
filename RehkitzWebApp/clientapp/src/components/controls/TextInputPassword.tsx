import { useState } from 'react'
import styled from 'styled-components/macro'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface TextInputPasswordProps {
    placeholder: string
    onChange: (value: string) => void
    value: string
}

export function TextInputPassword({ placeholder, onChange, value }: TextInputPasswordProps) {
    const [passwordShown, setPasswordShown] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown)
    }

    return (
        <PasswordInputContainer>
            <PasswordInput
                placeholder={placeholder}
                type={passwordShown ? 'text' : 'password'}
                onChange={(e) => onChange(e.target.value)}
                value={value}
            />
            <TogglePasswordVisibility onClick={togglePasswordVisibility}>
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </TogglePasswordVisibility>
        </PasswordInputContainer>
    )
}

const PasswordInputContainer = styled.div`
    position: relative;
`

const PasswordInput = styled.input`
    border-radius: 8px;
    border: 2px solid #7c6b57; 
    width: 250px;
    font-size: 25px;
    margin: 10px;
    background: #898472;
    color: #ffeccb;
    &::placeholder {
        color: #ffeccb;
        opacity: 0.5;
    }
`

const TogglePasswordVisibility = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #777;
  font-size: 18px;
  color: #ffeccb;
`