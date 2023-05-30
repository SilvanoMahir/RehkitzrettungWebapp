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

export const CustomTextInput = styled.input`
    border-radius: 8px;
    width: 250px;
    font-size: 25px;
    margin: 10px;
    background: #7d6b52;
    color: #fffecb;
    &::placeholder {
        color: #fffecb; /* Change this to the desired color */
        opacity: 0.5;
      }
`

export const UserNameTextInput = styled.input`
    ${CustomTextInput};
    border-radius: 8px;
    font-size: 25px;
    margin-top: 20px;
    margin-right: 20px;
    display: flex;
    align-self: flex-end;
    background: #7d6b52;
    color: beige;
`
export const PasswordTextInput = styled.input`
    border-radius: 8px;
    font-size: 25px;
    margin-top: 20px;
    margin-right: 20px;
    display: flex;
    align-self: flex-end;
    background: #7d6b52;
    color: beige;
`
