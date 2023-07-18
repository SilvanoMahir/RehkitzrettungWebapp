import styled from 'styled-components/macro'
import { useContext, useState, useEffect } from 'react'
import { ProtocolEntries } from '../../../models/ProtocolEntries'
import { DeleteProtocolButton, EditProtocolButton } from '../../controls/Button'
import ProtocolBodySmallScreen from './ProtocolBodySmallScreen'
import { useMediaQuery } from 'react-responsive'
import ProtocolBodyLargeScreen from './ProtocolBodyLargeScreen'
import { AppContext, ProtocolsContext } from '../../../store/context'
import { ROUTE_ADAPT_PROTOCOL_PAGE } from '../../../App'
import { useNavigate } from 'react-router-dom'

interface Props {
    protocolId: String
}

export default function Protocol({ protocolId }: Props) {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })
    //const { protocolId } = useParams() --> not working now as Router not set, there used Props
    const { token } = useContext(AppContext)
    const { protocolsListLocal, dispatch } = useContext(ProtocolsContext)
    let navigate = useNavigate()
    const [protocolEntry, setProtocolEntry] = useState<ProtocolEntries>({
        protocolId: "",
        protocolCode: "",
        clientFullName: "",
        localName: "",
        date: "",
        foundFawns: 0,
        markedFawns: 0,
        remark: "",
        pilotFullName: "",
        regionName: "",
        areaSize: "",
        injuredFawns: 0,
    })

    useEffect(() => {
        const onMount = async () => {
            const data = protocolsListLocal.filter(protocol => protocol.protocolId === protocolId);
            setProtocolEntry(data[0]);
        }
        onMount();
    }, [protocolsListLocal, protocolId]);
      
    const deleteProtocol = async (protocolId: string) => {
        const response = await fetch(`/api/protocols/${Number(protocolId)}`, {
            method: 'DELETE',
            headers: { 
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            },
        })
        if (response.ok) {
            dispatch({ type: 'delete-protocols', protocolsListLocal, protocolId })
        }
    }

    const editProtocol = async () => {
        navigate(`${ROUTE_ADAPT_PROTOCOL_PAGE}/${protocolId}`)
    }

    return (
        <ProtocolLayout>
            <ProtocolTitle>Protokoll {protocolEntry.protocolCode}</ProtocolTitle>
            {isNotMobile ? <ProtocolBodyLargeScreen protocolEntry={protocolEntry} /> : <ProtocolBodySmallScreen protocolEntry={protocolEntry} />}
            <RowContainer>
                <DeleteProtocolButton onClick={() => deleteProtocol(protocolEntry.protocolId)}>Löschen</DeleteProtocolButton>
                <EditProtocolButton onClick={() => editProtocol()}>Bearbeiten</EditProtocolButton>
            </RowContainer>
        </ProtocolLayout>
    )
}

const ProtocolLayout = styled.div`
	margin: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
    background: #9A8873;
	color: beige;
	border-radius: 10px;
`

const ProtocolTitle = styled.div`
	font-weight: 500;
	font-size: 25px;
	margin: 10px;
    color: #fffecb;
`

const RowContainer = styled.div`
	margin: 10px;
	display: flex;
	flex-direction: row;
	align-self: stretch;
	justify-content: space-around
`