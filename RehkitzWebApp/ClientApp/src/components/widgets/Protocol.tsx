import styled from 'styled-components/macro'
import { ProtocolEntries } from '../../models/ProtocolEntries'
import { DeleteProtocolButton, EditProtocolButton } from '../controls/Button'
import ProtocolBody from './ProtocolBody'

interface Props {
    protocolEntry: ProtocolEntries
}

export default function Protocol({ protocolEntry }: Props) {

    const deleteProtocol = async (protocolId: string) => {
        const response = await fetch(`/api/protocols/${Number(protocolId)}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
          })
    }

    const editProtocol = async () => {
    }

    return (
        <ProtocolLayout>
            <ProtocolTitle>Protokoll {protocolEntry.protocolCode}</ProtocolTitle>
            <ProtocolBody protocolEntry={protocolEntry} />
            <RowContainer>
                <DeleteProtocolButton onClick={() => deleteProtocol(protocolEntry.protocolId)}>Loeschen</DeleteProtocolButton>
                <EditProtocolButton onClick={() => editProtocol()}>Bearbeiten</EditProtocolButton>
            </RowContainer>
        </ProtocolLayout>
    )
}

const ProtocolLayout = styled.div`
    border-radius: 8px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: 300px;
    background: #7d6b52;
    color: beige;
`

const ProtocolTitle = styled.div`
    font-weight: 500;
    font-size: 25px;
    margin: 10px;
`

const RowContainer = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-around
`