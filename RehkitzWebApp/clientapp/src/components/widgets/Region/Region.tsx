import styled from 'styled-components'
import { useContext, useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { AppContext, RegionContext } from '../../../store/context'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RegionEntries } from '../../../models/RegionEntries'
import { ROUTE_ADAPT_REGION_PAGE } from '../../../App'
import RegionBodyLargeScreen from './RegionBodyLargeScreen'
import { DeleteProtocolButton, EditProtocolButton } from '../../controls/Button'

interface Props {
    regionId: number
    userFunction: String
}

export default function Region({ regionId, userFunction }: Props) {

    const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' })

    const { token } = useContext(AppContext)
    const { regionsListLocal, dispatch_regions } = useContext(RegionContext)
    let navigate = useNavigate()
    const [regionEntry, setRegionEntry] = useState<RegionEntries>({
        regionId: 0,
        regionName: "",
        regionState: "",
        regionDistrict: "",
        contactPersonFirstName: "",
        contactPersonLastName: "",
        contactPersonEmail: "",
    })

    useEffect(() => {
        const onMount = async () => {
            const data = regionsListLocal.filter(region => region.regionId === regionId)
            setRegionEntry(data[0])
        }
        onMount();
    }, [regionsListLocal, regionId]);

    const deleteRegion = async (regionId: number) => {
        const answer = window.confirm("Wirklich löschen?")
        if (answer) {
            const response = await fetch(`/api/regions/${Number(regionId)}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            if (response.ok) {
                dispatch_regions({ type: 'delete-region', regionsListLocal, regionId })
                toast.success("Region erfolgreich gelöscht!", {
                    position: toast.POSITION.TOP_CENTER,
                    containerId: 'ToasterNotification'
                })
            }
        }
    }

    const editProtocol = async () => {
        navigate(`${ROUTE_ADAPT_REGION_PAGE}/${regionId}`)
    }

    return (
        <ProtocolLayout>
            <ProtocolTitle>Region {regionEntry.regionDistrict}</ProtocolTitle>
            {isLargeScreen ? <RegionBodyLargeScreen regionEntry={regionEntry} /> : <RegionBodyLargeScreen regionEntry={regionEntry} />}
            <RowContainer>
                {(userFunction !== 'Wildhut' && userFunction !== 'Benutzer') && (
                    <DeleteProtocolButton onClick={() => deleteRegion(regionEntry.regionId)}>Löschen</DeleteProtocolButton>
                )}
                {(userFunction !== 'Wildhut') && (
                    <EditProtocolButton onClick={() => editProtocol()}>Bearbeiten</EditProtocolButton>
                )}
            </RowContainer>
        </ProtocolLayout>
    )
}

const ProtocolLayout = styled.div`
	margin: 10px;
    padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
    background: #7c6b57;
	color: beige;
	border-radius: 10px;
    max-width: 850px;
    width: 85%;
`

const ProtocolTitle = styled.div`
	font-weight: 500;
	font-size: 25px;
	margin: 10px;
    color: #ffeccb;
`

const RowContainer = styled.div`
	margin: 10px;
	display: flex;
	flex-direction: row;
	align-self: stretch;
	justify-content: space-around
`