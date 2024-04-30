import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DeleteUserButton, DiscardUserButton, SaveProtocolButton } from '../controls/Button'
import { AppContext, RegionContext, UserContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTE_REGION_LIST_PAGE, ROUTE_USER_LIST_PAGE } from '../../App'
import ProtocolEntryForAdaptPage from '../widgets/Protocol/ProtocolEntryForAdaptPage'
import { Dropdown } from '../controls/Dropdown'
import { toast } from 'react-toastify'
import { JwtPayload } from '../../interfaces/jwtPayload'
import jwt_decode from 'jwt-decode'


export default function AdaptRegionPage() {

    // the negated form "isNotMobile" is used since there were issues
    // regarding the responsive design when using "isMobile" with "max-width"
    const isNotMobile = useMediaQuery({ query: '(min-width: 700px)' })

    const [regionId, setRegionId] = useState(0)
    const [regionName, setRegionName] = useState('')
    const [regionState, setRegionState] = useState('')
    const [regionDistrict, setRegionDistrict] = useState('')
    const [contactPersonEmail, setContacPersonEmail] = useState('')
    const [contactPersonFirstName, setContactPersonFirstName] = useState('')
    const [contactPersonLastName, setContactPersonLastName] = useState('')
    const [isNewRegion, setIsNewRegion] = useState(false)
    const [roles, setRoles] = useState<{ label: string; value: string; }[]>([])
    const [districts, setDistricts] = useState<{ label: string; value: string; }[]>([])
    const [regions, setRegions] = useState<{ label: string; value: string; }[]>([])
    const [states, setStates] = useState<{ label: string; value: string; }[]>([])
    const { regionsListLocal, dispatch_regions } = useContext(RegionContext)
    const { dispatch_token } = useContext(AppContext)
    const [userFunction, setUserFunction] = useState('')

    const { id } = useParams()

    useEffect(() => {
        const onMount = async () => {
            const storageToken = localStorage.getItem('user_token')
            if (storageToken !== null) {
                dispatch_token({ type: 'set-token', value: storageToken })
            }
            let decoded = jwt_decode(storageToken as string) as JwtPayload
            const userFunction = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            setUserFunction(userFunction)
            console.log(userFunction)

            const districtsData = await fetchDistricts(storageToken)
            const transformedDistricts = districtsData.map((district: { districtName: any }) => ({
                label: district.districtName,
                value: district.districtName,
            }))
            setDistricts(transformedDistricts)

            const statesData = await fetchStates(storageToken)
            const transformedStates = statesData.map((state: { stateName: any }) => ({
                label: state.stateName,
                value: state.stateName,
            }))
            setStates(transformedStates)

            console.log(districtsData)

            let data = regionsListLocal.filter(region => region.regionId.toString() === id)
            if (data.length === 0) {
                setIsNewRegion(true)
            }
            else {
                const updateUser = await fetchRegion(id, storageToken)
                setIsNewRegion(false)
                const { regionId, regionName, regionState, regionDistrict, contactPersonEmail,
                    contactPersonFirstName, contactPersonLastName } = updateUser

                setRegionId(regionId)
                setRegionName(regionName)
                setRegionState(regionState)
                setRegionDistrict(regionDistrict)
                setContacPersonEmail(contactPersonEmail)
                setContactPersonFirstName(contactPersonFirstName)
                setContactPersonLastName(contactPersonLastName)
            }
            const regionsData = await fetchRegions(storageToken)
            const transformedRegions = regionsData.map((role: { regionName: any }) => ({
                label: role.regionName,
                value: role.regionName,
            }))
            setRegions(transformedRegions)
        }
        onMount()
    }, [regionsListLocal, id, dispatch_token])

    let navigate = useNavigate()

    const discardRegion = async () => {
        navigate(ROUTE_REGION_LIST_PAGE)
    }

    const saveRegion = async () => {
        if (regionName === "" || regionState === "" || regionDistrict === "" || contactPersonEmail === ""
            || contactPersonFirstName === "" || contactPersonLastName === "") {
            toast.error("Bitte alle Felder ausfüllen!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
            return
        }
        const storageToken = localStorage.getItem('user_token')
        const response = await fetch('/api/regions', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${storageToken}`,
            },
            body: JSON.stringify({
                regionName: regionName,
                regionState: regionState,
                regionDistrict: regionDistrict,
                contactPersonEmail: contactPersonEmail,
                contactPersonFirstName: contactPersonFirstName,
                contactPersonLastName: contactPersonLastName
            }),
        })
        console.log(response);
        if (response.ok) {
            const newRegion = ({
                regionId: 0,
                regionName: regionName,
                regionState: regionState,
                regionDistrict: regionDistrict,
                contactPersonEmail: contactPersonEmail,
                contactPersonFirstName: contactPersonFirstName,
                contactPersonLastName: contactPersonLastName
            })
            dispatch_regions({ type: 'add-region', regionsListLocal, newRegion })
            navigate(ROUTE_REGION_LIST_PAGE)
            toast.success("Region erfolgreich hinzugefügt!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
        } else if (response.status === 400) {
            response.json().then((errorData) => {
                if (Array.isArray(errorData) && errorData.length > 0) {
                    errorData.forEach((errorItem) => {
                        const errorMsg = errorItem.description
                        toast.error(errorMsg, {
                            position: toast.POSITION.TOP_CENTER,
                            containerId: 'ToasterNotification',
                        })
                    })
                } else {
                    toast.error('Ein Fehler ist aufgetreten! Bitte probieren Sie es später nochmals.', {
                        position: toast.POSITION.TOP_CENTER,
                        containerId: 'ToasterNotification',
                    })
                }
            })
        } else {
            toast.error('Ein Fehler ist aufgetreten! Bitte probieren Sie es später nochmals.', {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification',
            })
        }
    }

    const updateRegion = async () => {
        if (regionName === "" || regionState === "" || regionDistrict === "" || contactPersonEmail === ""
            || contactPersonFirstName === "" || contactPersonLastName === "") {
            toast.error("Bitte alle Felder ausfüllen!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
            return
        }
        const storageToken = localStorage.getItem('user_token')
        const response = await fetch(`${`/api/regions`}/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${storageToken}`,
            },
            body: JSON.stringify({
                regionId: id,
                regionName: regionName,
                regionState: regionState,
                regionDistrict: regionDistrict,
                contactPersonEmail: contactPersonEmail,
                contactPersonFirstName: contactPersonFirstName,
                contactPersonLastName: contactPersonLastName
            }),
        })
        if (response.ok) {
            dispatch_regions({ type: 'update-regions', regionsListLocal })
            navigate(ROUTE_REGION_LIST_PAGE)
            toast.success("Benutzer erfolgreich angepasst!", {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification'
            })
        } else if (response.status === 400) {
            response.json().then((errorData) => {
                if (Array.isArray(errorData) && errorData.length > 0) {
                    errorData.forEach((errorItem) => {
                        const errorMsg = errorItem.description
                        toast.error(errorMsg, {
                            position: toast.POSITION.TOP_CENTER,
                            containerId: 'ToasterNotification',
                        })
                    })
                } else {
                    toast.error('Ein Fehler ist aufgetreten! Bitte probieren Sie es später nochmals.', {
                        position: toast.POSITION.TOP_CENTER,
                        containerId: 'ToasterNotification',
                    })
                }
            })
        } else {
            toast.error('Ein Fehler ist aufgetreten! Bitte probieren Sie es später nochmals.', {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'ToasterNotification',
            })
        }
    }

    const deleteRegion = async () => {
        const answer = window.confirm("Wirklich löschen?")
        const storageToken = localStorage.getItem('user_token')
        if (answer) {
            const response = await fetch(`${`/api/region`}/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${storageToken}`,
                }
            })
            if (response.ok) {
                dispatch_regions({ type: 'delete-region', regionsListLocal, regionId })
                navigate(ROUTE_REGION_LIST_PAGE)
                toast.success("Region erfolgreich gelöscht!", {
                    position: toast.POSITION.TOP_CENTER,
                    containerId: 'ToasterNotification'
                })
            }
        }
    }

    const fetchRegion = async (id: string | undefined, storageToken: string | null) => {
        const response = await fetch(`/api/regions/${id}`, {
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

    const fetchDistricts = async (storageToken: string | null) => {
        const response = await fetch(`/api/districts`, {
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

    const fetchStates = async (storageToken: string | null) => {
        const response = await fetch(`/api/states`, {
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

    const fetchRegions = async (storageToken: string | null) => {
        const response = await fetch('/api/regions', {
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

    return (
        <AdaptUserLayout>
            {!isNotMobile && <Menu />}
            <AdaptUserRowLayout isNotMobile={isNotMobile}>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <AdaptUserColumnLayout>
                    <UserLayout isNotMobile={isNotMobile}>
                        <UserTitle>{isNewRegion ? 'Neue Region' : `Region ${regionName}`}</UserTitle>
                        <ColumnContainer>
                            <ProtocolEntryForAdaptPage entry="Name Region" value={regionName} callbackFunction={setRegionName} />
                            <ProtocolEntryForAdaptPage entry="Kontaktperson Vorname" value={contactPersonFirstName} callbackFunction={setContactPersonFirstName} />
                            <ProtocolEntryForAdaptPage entry="Kontaktperson Nachname" value={contactPersonLastName} callbackFunction={setContactPersonLastName} />
                            <ProtocolEntryForAdaptPage entry="Kontaktperson E-Mail" value={contactPersonEmail} callbackFunction={setContacPersonEmail} />
                            {(userFunction === 'Admin') && (
                                <><Dropdown entry="Distrikt" options={districts} value={regionDistrict} onChange={setRegionDistrict} />
                                <Dropdown entry="Kanton" options={states} value={regionState} onChange={setRegionState} /></>
                            )}
                        </ColumnContainer>
                    </UserLayout>
                    <RowContainer>
                        <DiscardUserButton onClick={() => discardRegion()}>Verwerfen</DiscardUserButton>
                        {(!isNewRegion) && <DeleteUserButton onClick={() => deleteRegion()}>Löschen</DeleteUserButton>}
                        <SaveProtocolButton onClick={() => isNewRegion ? saveRegion() : updateRegion()}>Speichern</SaveProtocolButton>
                    </RowContainer>
                </AdaptUserColumnLayout >
            </AdaptUserRowLayout>
        </AdaptUserLayout>
    )
}

const AdaptUserLayout = styled.div`
    height: 100%;
`

const AdaptUserRowLayout = styled.div<{ isNotMobile: boolean }>`
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-left: ${({ isNotMobile }) => (isNotMobile ? "30%" : "none")};
    @media (min-width: 1800px) {
        margin-left: 530px;
    }
`

const AdaptUserColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

const RowContainer = styled.div` 
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    margin-bottom: 10px;
`

const UserLayout = styled.div<{ isNotMobile: boolean }>`
    margin: 0px 10px 10px;
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #7c6b57;
    color: beige;
    max-width: 30em;
    border-radius: 10px;
    @media (min-width: 700px) {
        display: inline-block;
        width: 90%;
  	}
`

const UserTitle = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 25px;
    margin: 10px;
    color: #ffeccb;
`

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
