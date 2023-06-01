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

export const TextInputPswd = ({ onChange, value, placeholder }: Props) => (
    <CustomTextInput
        onChange={e => onChange(e.target.value)}
        value={value}
        type="password"
        placeholder={placeholder}
    />
)


export const CustomTextInput = styled.input`
    border-radius: 8px;
    width: 250px;
    font-size: 25px;
    margin: 10px;
    background: #898472;
    color: #fffecb;
    &::placeholder {
        color: #fffecb; /* Change this to the desired color */
        opacity: 0.5;
      }
`