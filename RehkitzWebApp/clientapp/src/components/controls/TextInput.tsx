import styled from 'styled-components/macro'

interface Props {
    onChange: (value: string) => void
    value: string
    placeholder?: string
}

export const TextInput = ({ onChange, value, placeholder }: Props) => (
    <CustomTextInput
        type="text"
        onChange={e => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
    />
)

export const TextInputPassword = ({ onChange, value, placeholder }: Props) => (
    <CustomTextInput
        onChange={e => onChange(e.target.value)}
        value={value}
        type="password"
        placeholder={placeholder}
    />
)

export const TextInputForAdaptPage = ({ onChange, value, placeholder }: Props) => (
    <CustomTextInputForAdaptPage
        type="text"
        onChange={e => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
    />
)

const CustomTextInput = styled.input`
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

const CustomTextInputForAdaptPage = styled.input`
    display: flex;
    flex: 1;
    border-radius: 8px;
    border: 2px solid #7c6b57; 
    width: 100%;
    font-size: 20px;
    margin: 10px;
    background: #898472;
    color: #ffeccb;
    &::placeholder {
        color: #ffeccb;
        opacity: 0.5;
    }
    @media (min-width: 1400px) {
        font-size: 1.25em;
    }
`