import styled from 'styled-components'
import ProtocolEntry from './RegionEntry'
import { RegionEntries } from '../../../models/RegionEntries'

interface Props {
    regionEntry: RegionEntries
}

export default function RegionBodyLargeScreen({ regionEntry }: Props) {

    return (
        <RowContainer>
            <ColumnContainer>
                <ProtocolEntry entry="Name Region" value={regionEntry?.regionName} />
                <ProtocolEntry entry="Kanton" value={regionEntry?.regionState} />
                <ProtocolEntry entry="Distrikt" value={regionEntry?.regionDistrict} />
            </ColumnContainer>
            <ColumnContainer>
                <ProtocolEntry entry="Vorname Kontaktperson" value={regionEntry?.contactPersonFirstName} />
                <ProtocolEntry entry="Name Kontaktperson" value={regionEntry?.contactPersonLastName} />
                <ProtocolEntry entry="E-Mail Kontaktperson" value={regionEntry?.contactPersonEmail} />
            </ColumnContainer>
        </RowContainer>
    )
}

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-self: stretch;
    width: 100%;
`

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`