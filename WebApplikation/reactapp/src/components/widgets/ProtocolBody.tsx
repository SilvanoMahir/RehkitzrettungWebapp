import styled from "styled-components"

export default function ProtocolBody() {

    return (
        <RowContainer>
            <ColumnContainer>
                <ProtocolEntry>Auftraggeber</ProtocolEntry>
                <ProtocolEntry>Lokalname</ProtocolEntry>
                <ProtocolEntry>Datum</ProtocolEntry>
                <ProtocolEntry>Gefundene Kitze</ProtocolEntry>
                <ProtocolEntry>Markierte Kitze</ProtocolEntry>
                <ProtocolEntry>Bemerkung</ProtocolEntry>
            </ColumnContainer>
            <ColumnContainer>
                <ProtocolEntry>Pilot</ProtocolEntry>
                <ProtocolEntry>Region</ProtocolEntry>
                <ProtocolEntry>Flaeche</ProtocolEntry>
                <ProtocolEntry>Verletzte Kitze</ProtocolEntry>
            </ColumnContainer>
        </RowContainer>
    )
}

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ProtocolEntry = styled.div`
`