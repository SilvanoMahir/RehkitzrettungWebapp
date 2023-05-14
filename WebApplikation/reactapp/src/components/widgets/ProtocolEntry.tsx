import styled from "styled-components"

interface Props {
    entry: string
    value?: string | number
}

export default function ProtocolEntry({ entry, value }: Props) {

    return (
        <RowContainer>
            <Entry>{entry}</Entry>
            <Value>{value}</Value>
        </RowContainer>
    )
}

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Entry = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-left: 15px;
    font-weight: bold;
`

const Value = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-left: 15px;
`