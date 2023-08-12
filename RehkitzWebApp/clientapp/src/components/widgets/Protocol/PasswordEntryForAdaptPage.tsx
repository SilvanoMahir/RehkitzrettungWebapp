import styled from "styled-components"
import { TextInputPasswordEntry } from "../../controls/TextInputPasswordEntry"

interface Props {
    entry: string
    value: string
    callbackFunction: (value: string) => void
}

export default function PasswordEntryForAdaptPage({ entry, value, callbackFunction }: Props) {

    return (
        <RowContainer>
            <Entry>{entry}</Entry>
            <TextInputPasswordEntry placeholder="" onChange={callbackFunction} value={""}/>
        </RowContainer>
    )
}

const RowContainer = styled.div`
    display: flex;
    flex: 1;
`

const Entry = styled.div`
    flex: 1;
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
