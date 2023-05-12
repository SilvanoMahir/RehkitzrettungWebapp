import styled from "styled-components"

interface Props {
    entry: string
    value?: string
}

export default function ProtocolEntry({ entry, value }: Props) {

    return (
        <RowContainer>
            <div>{entry}</div>
            <div>{value}</div>
        </RowContainer>
    )
}

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`