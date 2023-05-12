import { useEffect, useState } from "react"
import styled from "styled-components"
import { ProtocolEntries } from "../../models/ProtocolEntries"
import ProtocolEntry from './ProtocolEntry'

export default function ProtocolBody() {

    const [protocolEntries, setProtocolEntries] = useState<ProtocolEntries[]>([])
    const [loadingProtocols, setLoadingProtocols] = useState(true)

    useEffect(() => {
        const onMount = async () => {
            const response = await fetch('api/protocols')
            const data = await response.json()
            setProtocolEntries(data)
            setLoadingProtocols(false)
        }
        onMount()
    }, [])

    return (
        loadingProtocols ?
            <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
            :
            <RowContainer>
                {protocolEntries?.map(protocolEntry => (
                    <>
                        <ColumnContainer>
                            <ProtocolEntry entry="Auftraggeber" value={protocolEntry?.clientFullName} />
                            <ProtocolEntry entry="Lokalname" value={protocolEntry?.localName} />
                            <ProtocolEntry entry="Datum" value={protocolEntry?.date} />
                            <ProtocolEntry entry="Gefundene Kitze" value={protocolEntry?.foundFawns} />
                            <ProtocolEntry entry="Markierte Kitze" value={protocolEntry?.markedFawns} />
                            <ProtocolEntry entry="Bemerkung" value={protocolEntry?.remark} />
                        </ColumnContainer>
                        <ColumnContainer>
                            <ProtocolEntry entry="Pilot" value={protocolEntry?.pilotFullName} />
                            <ProtocolEntry entry="Region" value={protocolEntry?.regionName} />
                            <ProtocolEntry entry="Flaeche" value={protocolEntry?.areaSize} />
                            <ProtocolEntry entry="Verletzte Kitze" value={protocolEntry?.injuredFawns} />
                        </ColumnContainer>
                    </>
                ))}
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