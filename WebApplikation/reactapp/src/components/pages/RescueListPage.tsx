import styled from 'styled-components/macro'
import { DownloadProtocolButton, CreateProtocolButton } from '../controls/Button'
import Protocol from '../widgets/Protocol'

export default function RescueListPage() {

    const downloadProtocol = async () => {
    }

    const createProtocol = async () => {
    }

    return (
        <RescueListLayout>
            <Protocol />
            <Protocol />
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