import styled from 'styled-components/macro'
import { DeleteProtocolButton, EditProtocolButton } from '../controls/Button'

export default function Protocol() {

    const deleteProtocol = async () => {
    }

    const editProtocol = async () => {
    }

    return (
        <ProtocolLayout>
            <ProtocolTitle>Protokoll XYZ</ProtocolTitle>
            <DeleteProtocolButton onClick={() => deleteProtocol()}>Loeschen</DeleteProtocolButton>
            <EditProtocolButton onClick={() => editProtocol()}>Bearbeiten</EditProtocolButton>
        </ProtocolLayout>
    )
}

const ProtocolLayout = styled.div`
                margin: 20px;
                display: flex;
                flex-direction: row;
                `

const ProtocolTitle = styled.div`
                margin-left: 15px;
                font-weight: 500;
                font-size: 25px;
                `