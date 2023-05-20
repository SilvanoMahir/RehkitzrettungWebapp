import styled from 'styled-components/macro'
import { useContext, useState, useEffect } from 'react'
import { ProtocolEntries } from '../../models/ProtocolEntries'
import { DeleteProtocolButton, EditProtocolButton } from '../controls/Button'
import { ProtocolsContext } from 'store/context'
import ProtocolBody from './ProtocolBody'
import { useNavigate, useParams } from 'react-router-dom'
import ProtocolEntry from './ProtocolEntry'


interface Props {
      protocolId: String
}

export default function Protocol({protocolId}: Props) {

    //const { protocolId } = useParams()
    const [protocolIdState, setprotocolIdState] = useState('')
    const { protocolsListLocal, dispatch } = useContext(ProtocolsContext)
    const [protocolEntry, setProtocolEntry] = useState<ProtocolEntries>();

      useEffect(() => {
        const onMount = async () => {
          const data = protocolsListLocal.filter(protocol => protocol.protocolId === protocolId);
          setProtocolEntry(data[0]);
          //setprotocolIdState(protocolId)
        };
        onMount();
      }, [protocolsListLocal, protocolId]);
      

    const deleteProtocol = async (protocolId: string) => {
        const response = await fetch(`/api/protocols/${Number(protocolId)}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
        })

        if (response.ok) {
            dispatch({ type: 'delete-protocols', protocolsListLocal, protocolId})
          }        
    }

    const editProtocol = async () => {
    }

    return (
        <ProtocolLayout>
        {protocolEntry ? (
          <>
            <ProtocolTitle>Protokoll {protocolId}</ProtocolTitle>
            <ProtocolBody protocolEntry={protocolEntry} />
            <RowContainer>
              <DeleteProtocolButton onClick={() => deleteProtocol(protocolEntry.protocolId)}>Loeschen</DeleteProtocolButton>
              <EditProtocolButton onClick={() => editProtocol()}>Bearbeiten</EditProtocolButton>
            </RowContainer>
          </>
        ) : (
          <p>Loading...</p>
        )}
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