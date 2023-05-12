import styled from "styled-components"
import ProtocolEntry from './ProtocolEntry'

export default function ProtocolBody() {

    return (
        <RowContainer>
            <ColumnContainer>
                <ProtocolEntry entry="Auftraggeber" value="Back" />
                <ProtocolEntry entry="Lokalname" value="Back" />
                <ProtocolEntry entry="Datum" value="Back" />
                <ProtocolEntry entry="Gefundene Kitze" value="Back" />
                <ProtocolEntry entry="Markierte Kitze" value="Back" />
                <ProtocolEntry entry="Bemerkung" value="Back" />
            </ColumnContainer>
            <ColumnContainer>
                <ProtocolEntry entry="Pilot" value="Back" />
                <ProtocolEntry entry="Region" value="Back" />
                <ProtocolEntry entry="Flaeche" value="Back" />
                <ProtocolEntry entry="Verletzte Kitze" value="Back" />
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