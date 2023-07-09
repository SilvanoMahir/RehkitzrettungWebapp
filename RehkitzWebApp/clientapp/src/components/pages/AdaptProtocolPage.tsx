import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { DiscardProtocolButton, SaveProtocolButton } from '../controls/Button'
import { AppContext, ProtocolsContext } from '../../store/context'
import Protocol from '../widgets/Protocol/Protocol'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import { useNavigate } from 'react-router-dom'
import { ROUTE_RESCUE_LIST_PAGE } from '../../App'
import ProtocolForAdaptPage from '../widgets/Protocol/ProtocolForAdaptPage'
import { ProtocolEntries } from '../../models/ProtocolEntries'

export default function AdaptProtocolPage() {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })

    const [loadingProtocols, setLoadingProtocols] = useState(true)
    const { protocolsListLocal, dispatch } = useContext(ProtocolsContext)
    const { dispatch_token, token } = useContext(AppContext)
    let navigate = useNavigate()

    const protocolEntry = ({
        protocolId: "1",
        protocolCode: "2",
        clientFullName: "3",
        localName: "4",
        date: "5",
        foundFawns: 6,
        markedFawns: 7,
        remark: "8",
        pilotFullName: "9",
        regionName: "10",
        areaSize: "11",
        injuredFawns: 12,
    })

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

    const discardProtocol = async () => {
        navigate(ROUTE_RESCUE_LIST_PAGE)
    }

    const saveProtocol = async (newProtocol: ProtocolEntries) => {
        const storageToken = localStorage.getItem('user_token');
        const response = await fetch(`/api/protocols`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${storageToken}`, // notice the Bearer before your token
            },
            body: JSON.stringify({
                ProtocolCode: newProtocol.protocolCode,
                ClientFullName: newProtocol.clientFullName,
                LocalName: newProtocol.localName,
                // Date: newProtocol.date,
                FoundFawns: newProtocol.foundFawns,
                MarkedFawns: newProtocol.markedFawns,
                Remark: newProtocol.remark,
                PilotFullName: newProtocol.pilotFullName,
                RegionName: newProtocol.regionName,
                AreaSize: newProtocol.areaSize,
                InjuredFawns: newProtocol.injuredFawns,
            })
        })
        if (response.ok) {
            dispatch({ type: 'add-protocols', protocolsListLocal, newProtocol })
        }
        navigate(ROUTE_RESCUE_LIST_PAGE)
    }

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <ProtocolForAdaptPage protocolEntry={protocolEntry}/>
                    <RowContainer>
                        <DiscardProtocolButton onClick={() => discardProtocol()}>Verwerfen</DiscardProtocolButton>
                        <SaveProtocolButton onClick={() => saveProtocol(protocolEntry)}>Speichern</SaveProtocolButton>
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

    &::placeholder {
        color: #fffecb; /* Change this to the desired color */
        opacity: 0.5;
    }
`