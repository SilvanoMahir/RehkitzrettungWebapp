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
    flex: 1;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #fffecb;
`

const Value = styled.div`
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #fffecb;
`
