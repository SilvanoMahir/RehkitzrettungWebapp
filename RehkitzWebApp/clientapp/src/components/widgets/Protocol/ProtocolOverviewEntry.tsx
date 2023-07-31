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
    flex: 6;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #fffecb;
    white-space: initial;
    @media (max-width: 430px) {
        font-size: 0.9em;
    }
    @media (min-width: 1400px) {
        font-size: 1.25em;
    }
`

const Value = styled.div`
    flex: 2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #fffecb;
    white-space: initial;
    @media (max-width: 430px) {
        font-size: 0.9em;
        flex: 1;
    }
    @media (min-width: 1400px) {
        font-size: 1.25em;
    }
`
