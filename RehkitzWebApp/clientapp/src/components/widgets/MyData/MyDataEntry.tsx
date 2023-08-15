import styled from "styled-components"

interface Props {
    entry: string
    value?: string | number
}

export default function MyDataEntry({ entry, value }: Props) {

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
    @media (max-width: 400px) {
        flex-direction: column;
    }
`

const Entry = styled.div`
    flex: 5;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #ffeccb;
    white-space: initial;
    font-size: 20px;
    @media (min-width: 401px) {
        text-align: end;
        margin-right: 1em;
    }
`

const Value = styled.div`
    flex: 4;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #fffecb;
    white-space: initial;
    font-size: 20px;
`
