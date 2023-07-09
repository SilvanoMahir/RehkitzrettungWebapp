import styled from "styled-components"
import { TextInput } from "../../controls/TextInput"

interface Props {
    entry: string
    value: string
    callbackFunction: (value: string) => void
}

export default function ProtocolEntry({ entry, value, callbackFunction }: Props) {

    return (
        <RowContainer>
            <Entry>{entry}</Entry>
            <TextInput onChange={callbackFunction} value={value}/>
        </RowContainer>
    )
}

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center
`

const Entry = styled.div`
    flex: 1;
    margin-left: 15px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    max-width: 200px;
`

const Value = styled.input`
    flex: 1;
    margin-left: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fcba03;
    color: fffecb;
    max-width: 200px;

    border-radius: 8px;
    font-size: 15px;
    background: #898472;

    opacity: 0.5;
`
