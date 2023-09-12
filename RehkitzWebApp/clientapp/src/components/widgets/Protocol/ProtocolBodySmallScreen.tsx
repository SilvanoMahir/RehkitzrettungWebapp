import styled from 'styled-components'
import { ProtocolEntries } from '../../../models/ProtocolEntries'
import ProtocolEntry from './ProtocolEntry'

interface Props {
    protocolEntry: ProtocolEntries
}

export default function ProtocolBodySmallScreen({ protocolEntry }: Props) {

    return (
        <ColumnContainer>
            <ProtocolEntry entry="Auftraggeber" value={protocolEntry?.clientFullName} />
            <ProtocolEntry entry="Lokalname" value={protocolEntry?.localName} />
            <ProtocolEntry entry="Datum" value={formatDate(protocolEntry?.date)} />
            <ProtocolEntry entry="Pilot" value={protocolEntry?.pilotFullName} />
            <ProtocolEntry entry="Region" value={protocolEntry?.regionName} />
            <ProtocolEntry entry="Fläche" value={protocolEntry?.areaSize} />
            <ProtocolEntry entry="Gefundene Kitze" value={protocolEntry?.foundFawns} />
            <ProtocolEntry entry="Markierte Kitze" value={protocolEntry?.markedFawns} />
            <ProtocolEntry entry="Verletzte Kitze" value={protocolEntry?.injuredFawns} />
            <ProtocolEntry entry="Bemerkung" value={protocolEntry?.remark} />
        </ColumnContainer>
    )
}

export function formatDate(dateString: string | number | Date) {
    if (!dateString) {
        return ''
    }
  
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
  
    return `${day}.${month}.${year}`
}

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (max-width: 400px) {
        display: unset;
    }
`