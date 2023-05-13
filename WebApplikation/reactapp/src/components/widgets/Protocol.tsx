import styled from 'styled-components/macro'
import { ProtocolEntries } from '../../models/ProtocolEntries'
import { DeleteProtocolButton, EditProtocolButton } from '../controls/Button'
import ProtocolBody from './ProtocolBody'

interface Props {
    protocolEntry: ProtocolEntries
}

export default function Protocol({ protocolEntry }: Props) {

    const deleteProtocol = async () => {
    }

    const editProtocol = async () => {
    }

    return (
        <ProtocolLayout>
            <ProtocolTitle>Protokoll {protocolEntry.protocolId}</ProtocolTitle>
            <ProtocolBody protocolEntry={protocolEntry} />
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
    width: 800px;
`

const ProtocolTitle = styled.div`
    font-weight: 500;
    font-size: 25px;
`

export const RowContainer = styled.div`
    border: 1px solid gray;
    border-radius: 8px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-around
`