import styled from "styled-components"
import { TextInputForAdaptPage } from "../../controls/TextInput"

interface Props {
    entry: string
    value: string
    callbackFunction: (value: string) => void
}

export default function ProtocolEntryForAdaptPage({ entry, value, callbackFunction }: Props) {

    return (
        <RowContainer>
            <Entry>{entry}</Entry>
            <TextInputForAdaptPage onChange={callbackFunction} value={value}/>
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
    line-height: 50px;
`