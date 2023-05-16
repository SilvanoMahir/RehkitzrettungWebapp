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

const CustomTextInput = styled.input`
    border-radius: 8px;
    width: 250px;
    font-size: 25px;
    margin: 10px;
`
