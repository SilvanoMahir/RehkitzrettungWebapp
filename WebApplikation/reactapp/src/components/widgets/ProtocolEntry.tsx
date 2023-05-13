import styled from "styled-components"

interface Props {
    entry: string
    value?: string
}

export default function ProtocolEntry({ entry, value }: Props) {

    return (
        <RowContainer>
            <EntryLayout>{entry}</EntryLayout>
            <EntryLayout>{value}</EntryLayout>
        </RowContainer>
    )
}

export const RowContainer = styled.div`
    border: 1px solid gray;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
`

export const EntryLayout = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-left: 15px;
`