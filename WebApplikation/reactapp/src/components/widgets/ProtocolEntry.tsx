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

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const EntryLayout = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-left: 15px;
`