import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { DownloadProtocolButton, CreateProtocolButton } from '../controls/Button'
import { AppContext, ProtocolsContext } from '../../store/context'
import Protocol from '../widgets/Protocol'
import Sidebar from '../widgets/Sidebar'

export default function RescueListPage() {

    const [loadingProtocols, setLoadingProtocols] = useState(true)
    const { protocolsListLocal, dispatch } = useContext(ProtocolsContext)
    const { token } = useContext(AppContext)

    useEffect(() => {
        const onMount = async () => {
            const protocolsListLocal = await fetchProtocols()
            setLoadingProtocols(false)
            dispatch({ type: 'get-protocols', protocolsListLocal})
        }
        onMount()
    }, [dispatch])

    const fetchProtocols = async () => {
        const response = await fetch('/api/protocols', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }
        })
        if (response.ok) {
          return await response.json()
        }
        return []
      }

    const search = async () => {
    }

    const downloadProtocol = async () => {
    }

    const createProtocol = async () => {
    }

    let content;

    if (loadingProtocols) {
        content = (<p><em>Laedt Protokolle... Bitte Seite aktualisieren, sobald ASP.NET Backend aufgestartet ist.</em></p>);
      } else if (protocolsListLocal.length === 0) {
        content = (<p><em>Keine Protokolle gefunden.</em></p>);
      } else {
        content = protocolsListLocal.map(protocolEntry => (
          <Protocol key={protocolEntry.protocolId} protocolId={protocolEntry.protocolId} />
        ));
    }

    return (
        <RescueListRowLayout>
            <Sidebar />
            <RescueListColumnLayout>
                <SearchInput onChange={search}
                    value={''}
                    placeholder={'Suchen'}></SearchInput>
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
    justify-content: space-between;
    background: #9A8873;
`

const RescueListColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 90px;
`

const RowContainer = styled.div` 
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    margin-bottom: 20px;
`

const SearchInput = styled.input` 
    display: flex;
    align-self: flex-end;
    border-radius: 8px;
    width: 250px;
    font-size: 25px;
    margin: 10px;
    background: #898472;
    color: #fffecb;
    &::placeholder {
        color: #fffecb; /* Change this to the desired color */
        opacity: 0.5;
    }
`