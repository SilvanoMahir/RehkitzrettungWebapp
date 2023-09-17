import styled from 'styled-components/macro'

interface PasswordCheckboxProps {
    entry: string
    showPassword: boolean
    onChange: (selectedValue: boolean) => void
}

export function PasswordCheckbox({ entry, showPassword, onChange }: PasswordCheckboxProps) {
    const handleCheckboxChange = () => {
        onChange(!showPassword)
    }

    return (
        <RowContainer>
            <Entry>{entry}</Entry>
            <CheckboxInputContainer>
                <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={handleCheckboxChange}
                />
            </CheckboxInputContainer>
        </RowContainer>
    )
}

const CheckboxInputContainer = styled.div` 
    display: flex;
    flex: 1;
    position: relative;
`

const RowContainer = styled.div`
    display: flex;
`

const Entry = styled.div`
    flex: 1;
    margin-left: 15px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: end;
    line-height: 50px;
    color: #ffeccb;
    @media (min-width: 1400px) {
        font-size: 1.25em;
    }
`