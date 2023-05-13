import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { ProtocolEntries } from '../../models/ProtocolEntries'
import { DownloadProtocolButton, CreateProtocolButton } from '../controls/Button'
import Protocol from '../widgets/Protocol'
import Sidebar from '../widgets/Sidebar'

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

    const search = async () => {
    }

    const downloadProtocol = async () => {
    }

    const createProtocol = async () => {
    }

    let content = loadingProtocols ?
        <p><em>Laedt Protokolle... Bitte Seite aktualisieren, sobald ASP.NET Backend aufgestartet ist.</em></p>
        :
        protocolEntries?.map(protocolEntry => (
            <Protocol protocolEntry={protocolEntry} />
        ))

    return (
        <RescueListRowLayout>
            <Sidebar />
            <RescueListColumnLayout>
                <SearchTextInput onChange={search}
                    value="Suche"
                    placeholder="Suche"></SearchTextInput>
                {content}
                <RowContainer>
                    <DownloadProtocolButton onClick={() => downloadProtocol()}>Bericht herunterladen</DownloadProtocolButton>
                    <CreateProtocolButton onClick={() => createProtocol()}>Neues Protokoll erstellen</CreateProtocolButton>
                </RowContainer>
            </RescueListColumnLayout >
        </RescueListRowLayout>
    )
}

const RescueListRowLayout = styled.div`
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    background: darkgoldenrod;
    height: 100vh;
`

const RescueListColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const RowContainer = styled.div` 
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    margin-bottom: 20px;
`

const SearchTextInput = styled.input`
    border-radius: 8px;
    width: 250px;
    font-size: 25px;
    margin-top: 20px;
    margin-right: 20px;
    display: flex;
    align-self: flex-end;
    background: saddlebrown;
    color: beige;
`