import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DownloadProtocolButton, CreateProtocolButton } from '../controls/Button'
import { AppContext, ProtocolsContext } from '../../store/context'
import Protocol from '../widgets/Protocol/Protocol'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import { useNavigate } from 'react-router-dom'
import { ROUTE_ADAPT_PROTOCOL_PAGE } from '../../App'
import { toast } from 'react-toastify'
import { saveAs } from 'file-saver'
import { ProtocolEntries } from '../../models/ProtocolEntries'
import jwt_decode from 'jwt-decode'
import { JwtPayload } from '../../interfaces/jwtPayload'


export default function RescueListPage() {

    // the negated form "isNotMobile" is used since there were issues
    // regarding the responsive design when using "isMobile" with "max-width"
    const isNotMobile = useMediaQuery({ query: '(min-width: 700px)' })

    const [loadingProtocols, setLoadingProtocols] = useState(true)
    const [localToken, setLocalToken] = useState('')
    const [userFunction, setUserFunction] = useState('')
    const [fetchedProtocolsListLocal, setFetchedProtocolsListLocal] = useState<ProtocolEntries[]>([])
    const { protocolsListLocal, dispatch_protocols } = useContext(ProtocolsContext)
    const { dispatch_token } = useContext(AppContext)
    let navigate = useNavigate()

    useEffect(() => {
        const onMount = async () => {
            const storageToken = localStorage.getItem('user_token')
            if (storageToken !== null) {
                dispatch_token({ type: 'set-token', value: storageToken })
                setLocalToken(storageToken)
            }
            let decoded = jwt_decode(storageToken as string) as JwtPayload
            const userRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            setUserFunction(userRole)

            const fetchedProtocols = await fetchProtocols(storageToken)
            setFetchedProtocolsListLocal(fetchedProtocols)
            const protocolsListLocal = [...fetchedProtocols].sort((a, b) => {
                const dateA = new Date(a.date.includes('T') ? a.date : `${a.date}T00:00:00.000Z`)
                const dateB = new Date(b.date.includes('T') ? b.date : `${b.date}T00:00:00.000Z`)
                return dateB.getTime() - dateA.getTime()
            })
            console.log(protocolsListLocal)
            setLoadingProtocols(false)
            dispatch_protocols({ type: 'get-protocols', protocolsListLocal })
        }
        onMount()
    }, [dispatch_protocols, dispatch_token])

    const fetchProtocols = async (storageToken: string | null) => {
        try {
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
        } catch (error) {
            return []
        }
    }

    const downloadProtocol = async (storageToken: string | null) => {
        try {
            const response = await fetch('/api/protocols/file', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${storageToken}`,
                },
            })

            if (response.ok) {
                const fileBlob = await response.blob()
                const currentDate = new Date()
                const year = currentDate.getFullYear()
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
                const day = currentDate.getDate().toString().padStart(2, '0')
                saveAs(fileBlob, `RehkitzrettungApp_Protokoll_${year}-${month}-${day}`)
                toast.success("Erfolgreich heruntergeladen!", {
                    position: toast.POSITION.TOP_CENTER,
                    containerId: 'ToasterNotification',
                })
            } else {
                toast.error("Herunterladen fehlgeschlagen!", {
                    position: toast.POSITION.TOP_CENTER,
                    containerId: 'ToasterNotification',
                })
            }
        } catch (error) {
            toast.error("Herunterladen fehlgeschlagen!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification',
            })
        }
    }

    const createProtocol = async () => {
        navigate(ROUTE_ADAPT_PROTOCOL_PAGE)
    }

    const handleSearchInputChange = async (event: { target: { value: string } }) => {
        let searchString = event.target.value

        if (searchString?.length === 1) {
            return
        }
        searchString = searchString.toLowerCase()
        let protocolsListLocal = fetchedProtocolsListLocal

        if (searchString !== '') {
            protocolsListLocal = protocolsListLocal.filter((protocol) =>
                protocol.protocolCode.toLowerCase().includes(searchString) ||
                protocol.clientFullName.toLowerCase().includes(searchString) ||
                protocol.localName.toLowerCase().includes(searchString) ||
                protocol.pilotFullName.toLowerCase().includes(searchString) ||
                protocol.regionName.toLowerCase().includes(searchString) ||
                protocol.remark.toLowerCase().includes(searchString) ||
                protocol.areaSize.toLowerCase().includes(searchString) ||
                protocol.foundFawns.toString().toLowerCase().includes(searchString) ||
                protocol.injuredFawns.toString().toLowerCase().includes(searchString) ||
                protocol.markedFawns.toString().toLowerCase().includes(searchString) ||
                protocol.date.toLowerCase().includes(searchString))
        }

        protocolsListLocal = [...protocolsListLocal].sort((a, b) => {
            const dateA: Date = new Date(a.date.split('.').reverse().join('-'))
            const dateB: Date = new Date(b.date.split('.').reverse().join('-'))
            return dateB.getTime() - dateA.getTime()
        })

        dispatch_protocols({ type: 'get-protocols', protocolsListLocal })
    }

    let content

    if (loadingProtocols) {
        content = (<p><em>Lädt Protokolle... Bitte Seite aktualisieren, sobald ASP.NET Backend aufgestartet ist.</em></p>)
    } else if (protocolsListLocal.length === 0) {
        content = (<p><em>Keine Protokolle gefunden.</em></p>)
    } else {
        content = protocolsListLocal.map(protocolEntry => (
            <Protocol key={protocolEntry.protocolId} protocolId={protocolEntry.protocolId} userFunction={userFunction} />
        ))
    }

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout isNotMobile={isNotMobile}>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <SearchInput
                        onChange={handleSearchInputChange}
                        isNotMobile={isNotMobile}
                        placeholder={'Suchen'}></SearchInput>
                    <RowContainer>
                        <DownloadProtocolButton onClick={() => downloadProtocol(localToken)}>Bericht herunterladen</DownloadProtocolButton>
                        {(userFunction !== 'Wildhut') && (
                            <CreateProtocolButton onClick={() => createProtocol()}>Neues Protokoll erstellen</CreateProtocolButton>
                        )}
                    </RowContainer>
                    <SiteTitle>Übersicht Protokolle</SiteTitle>
                    <RescueListItems>
                        {content}
                    </RescueListItems>
                </RescueListColumnLayout >
            </RescueListRowLayout>
        </RescueListLayout>
    )
}

const RescueListLayout = styled.div`
    height: 100%;
`

const RescueListItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const RescueListRowLayout = styled.div<{ isNotMobile: boolean }>`
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-left: ${({ isNotMobile }) => (isNotMobile ? "30%" : "none")};
    @media (min-width: 1800px) {
        margin-left: 530px;
    }
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
    border: 2px solid #7c6b57; 
    width: 250px;
    font-size: 25px;
    background: #898472;
    color: #ffeccb;
    margin-top: ${({ isNotMobile }) => (isNotMobile ? "1em" : "3em")};
    margin-right: ${({ isNotMobile }) => (isNotMobile ? "2vh" : "1vh")};
    &::placeholder {
        color: #ffeccb; 
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
    color: #ffeccb;
`