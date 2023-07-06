import styled from 'styled-components/macro'
import { useContext, useState, useEffect } from 'react'
import { ProtocolEntries } from '../../../models/ProtocolEntries'
import { DeleteProtocolButton, EditProtocolButton } from '../../controls/Button'
import ProtocolBodySmallScreen from './ProtocolBodySmallScreen'
import { useMediaQuery } from 'react-responsive'
import ProtocolBodyLargeScreen from './ProtocolBodyLargeScreen'
import { AppContext, ProtocolsContext } from '../../../store/context'
import ProtocolEntry from './ProtocolEntry'
import ProtocolEntryForAdaptPage from './ProtocolEntryForAdaptPage'

interface Props {
    protocolEntry: ProtocolEntries
}

export default function ProtocolForAdaptPage({ protocolEntry }: Props) {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })
    //const { protocolId } = useParams() --> not working now as Router not set, there used Props
    const { token } = useContext(AppContext)
    const { protocolsListLocal, dispatch } = useContext(ProtocolsContext)

    return (
        <ProtocolLayout>
            <ProtocolTitle>Protokoll {protocolEntry.protocolCode}</ProtocolTitle>
            <ColumnContainer>
                <ProtocolEntryForAdaptPage entry="Auftraggeber" value={protocolEntry?.clientFullName} />
                <ProtocolEntryForAdaptPage entry="Pilot" value={protocolEntry?.pilotFullName} />
                <ProtocolEntryForAdaptPage entry="Lokalname" value={protocolEntry?.localName} />
                <ProtocolEntryForAdaptPage entry="Region" value={protocolEntry?.regionName} />
                <ProtocolEntryForAdaptPage entry="Datum" value={protocolEntry?.date} />
                <ProtocolEntryForAdaptPage entry="Flaeche" value={protocolEntry?.areaSize} />
                <ProtocolEntryForAdaptPage entry="Gefundene Kitze" value={protocolEntry?.foundFawns} />
                <ProtocolEntryForAdaptPage entry="Verletzte Kitze" value={protocolEntry?.injuredFawns} />
                <ProtocolEntryForAdaptPage entry="Markierte Kitze" value={protocolEntry?.markedFawns} />
                <ProtocolEntryForAdaptPage entry="Bemerkung" value={protocolEntry?.remark} />
            </ColumnContainer>
        </ProtocolLayout>
    )
}

const ProtocolLayout = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #7d6b52;
    color: beige;
    max-width: 500px;
`

const ProtocolTitle = styled.div`
    font-weight: 500;
    font-size: 25px;
    margin: 10px;
`

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`