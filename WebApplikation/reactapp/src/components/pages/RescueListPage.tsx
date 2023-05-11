import styled from 'styled-components/macro'
import { DownloadProtocolButton, CreateProtocolButton } from '../controls/Button'
import Protocol from '../widgets/Protocol'

export default function RescueListPage() {

    const downloadProtocol = async () => {
    }

    const createProtocol = async () => {
    }

    return (
        <ProtocolListing>
            <Protocol />
            <Protocol />
            <DownloadProtocolButton onClick={() => downloadProtocol()}>Update</DownloadProtocolButton>
            <CreateProtocolButton onClick={() => createProtocol()}>Update</CreateProtocolButton>
        </ProtocolListing>
    )
}

const ProtocolListing = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
`