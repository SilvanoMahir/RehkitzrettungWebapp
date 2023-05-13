import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { ProtocolEntries } from '../../models/ProtocolEntries'
import { DeleteProtocolButton, EditProtocolButton } from '../controls/Button'
import ProtocolBody from './ProtocolBody'

export default function Protocol() {

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

    const deleteProtocol = async () => {
    }

    const editProtocol = async () => {
    }

    let content = loadingProtocols ?
        <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        :
        protocolEntries?.map(protocolEntry => (
            <>
                <ProtocolBody protocolEntry={protocolEntry} />
            </>
        ))

    return (
        <ProtocolLayout>
            <ProtocolTitle>Protokoll XYZ</ProtocolTitle>
            {content}
            <RowContainer>
                <DeleteProtocolButton onClick={() => deleteProtocol()}>Loeschen</DeleteProtocolButton>
                <EditProtocolButton onClick={() => editProtocol()}>Bearbeiten</EditProtocolButton>
            </RowContainer>
        </ProtocolLayout>
    )
}

const ProtocolLayout = styled.div`
    border: 1px solid gray;
    border-radius: 8px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ProtocolTitle = styled.div`
    margin-left: 15px;
    font-weight: 500;
    font-size: 25px;
`

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`