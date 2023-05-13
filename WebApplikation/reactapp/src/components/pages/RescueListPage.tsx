import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { ProtocolEntries } from '../../models/ProtocolEntries'
import { DownloadProtocolButton, CreateProtocolButton } from '../controls/Button'
import Protocol from '../widgets/Protocol'

export default function RescueListPage() {

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

    const downloadProtocol = async () => {
    }

    const createProtocol = async () => {
    }

    let content = loadingProtocols ?
        <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        :
        protocolEntries?.map(protocolEntry => (
            <>
                <Protocol protocolEntry={protocolEntry} />
            </>
        ))

    return (
        <RescueListLayout>
            {content}
            <RowContainer>
                <DownloadProtocolButton onClick={() => downloadProtocol()}>Bericht herunterladen</DownloadProtocolButton>
                <CreateProtocolButton onClick={() => createProtocol()}>Neues Protokoll erstellen</CreateProtocolButton>
            </RowContainer>
        </RescueListLayout>
    )
}

export const RescueListLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`