import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { DownloadProtocolButton, CreateProtocolButton } from '../controls/Button'
import { AppContext, ProtocolsContext } from '../../store/context'
import Protocol from '../widgets/Protocol/Protocol'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import { useNavigate } from 'react-router-dom'
import { ROUTE_ADAPT_PROTOCOL_PAGE } from '../../App'

export default function RescueListPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })

    const [loadingProtocols, setLoadingProtocols] = useState(true)
    const { protocolsListLocal, dispatch } = useContext(ProtocolsContext)
    const { dispatch_token } = useContext(AppContext)
    let navigate = useNavigate()

    useEffect(() => {
        const onMount = async () => {
            //token handling can probably be optimized
            const storageToken = localStorage.getItem('user_token'); 
            if (storageToken !== null) {
                dispatch_token({ type: 'set-token', value: storageToken })
            }
            const protocolsListLocal = await fetchProtocols(storageToken)
            setLoadingProtocols(false)
            dispatch({ type: 'get-protocols', protocolsListLocal })
        }
        onMount()
    }, [dispatch, dispatch_token])

    const fetchProtocols = async (storageToken: string | null) => {
        const response = await fetch('/api/protocols', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${storageToken}`,
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
        navigate(ROUTE_ADAPT_PROTOCOL_PAGE)
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
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <SearchInput onChange={search}
                        value={''}
                        isNotMobile={isNotMobile}
                        placeholder={'Suchen'}></SearchInput>
                    <SiteTitle>Übersicht Protokolle</SiteTitle>
                    {content}
                    <RowContainer>
                        <DownloadProtocolButton onClick={() => downloadProtocol()}>Bericht herunterladen</DownloadProtocolButton>
                        <CreateProtocolButton onClick={() => createProtocol()}>Neues Protokoll erstellen</CreateProtocolButton>
                    </RowContainer>
                </RescueListColumnLayout >
            </RescueListRowLayout>
        </RescueListLayout>
    )
}

const RescueListLayout = styled.div`
    height: 100%;
`

const RescueListRowLayout = styled.div`
    display: flex;
    flex-direction: row;
    background: #9A8873;
    height: 100%;
`

const RescueListColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
`

const RowContainer = styled.div` 
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    margin-bottom: 10px;
`

const SearchInput = styled.input<{ isNotMobile: boolean }>` 
    display: flex;
    align-self: flex-end;
    border-radius: 8px;
    width: 250px;
    font-size: 25px;
    background: #898472;
    color: #fffecb;
    margin-top: ${(props) => (props.isNotMobile ? "5vh" : "8vh")};
    margin-right: 0.75em; 

    &::placeholder {
        color: #fffecb; /* Change this to the desired color */
        opacity: 0.5;
    }
`

const SiteTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: 500;
    font-size: 2em;
    margin: 10px;
    color: #fffecb;
`