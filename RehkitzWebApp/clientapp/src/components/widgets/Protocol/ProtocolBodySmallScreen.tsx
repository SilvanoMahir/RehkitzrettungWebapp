import styled from "styled-components"
import { ProtocolEntries } from "../../../models/ProtocolEntries"
import ProtocolEntry from './ProtocolEntry'

interface Props {
    protocolEntry: ProtocolEntries
}

export default function ProtocolBodySmallScreen({ protocolEntry }: Props) {

    return (
        <ColumnContainer>
            <ProtocolEntry entry="Auftraggeber" value={protocolEntry?.clientFullName} />
            <ProtocolEntry entry="Lokalname" value={protocolEntry?.localName} />
            <ProtocolEntry entry="Datum" value={protocolEntry?.date} />
            <ProtocolEntry entry="Gefundene Kitze" value={protocolEntry?.foundFawns} />
            <ProtocolEntry entry="Markierte Kitze" value={protocolEntry?.markedFawns} />
            <ProtocolEntry entry="Bemerkung" value={protocolEntry?.remark} />
            <ProtocolEntry entry="Pilot" value={protocolEntry?.pilotFullName} />
            <ProtocolEntry entry="Region" value={protocolEntry?.regionName} />
            <ProtocolEntry entry="Flaeche" value={protocolEntry?.areaSize} />
            <ProtocolEntry entry="Verletzte Kitze" value={protocolEntry?.injuredFawns} />
        </ColumnContainer>
    )
}

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`