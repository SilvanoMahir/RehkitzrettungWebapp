import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppContext, RegionContext, UserContext } from '../../store/context'
import Sidebar from '../widgets/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
import { Menu } from '../widgets/Menu'
import { CreateNewUserButton } from '../controls/Button'
import { useNavigate } from 'react-router-dom'
import { RegionEntries } from '../../models/RegionEntries'
import { ROUTE_ADAPT_REGION_PAGE } from '../../App'
import Region from '../widgets/Region/Region'

export default function RegionListPage() {

    // the negated form "isNotMobile" is used since there were issues
    // regarding the responsive design when using "isMobile" with "max-width"
    const isNotMobile = useMediaQuery({ query: '(min-width: 700px)' })
    const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' })

    const [loadingRegions, setLoadingRegions] = useState(true)
    const [fetchedRegionListLocal, setFetchedRegionsListLocal] = useState<RegionEntries[]>([])
    const { regionsListLocal, dispatch_regions } = useContext(RegionContext)
    const { dispatch_token } = useContext(AppContext)
    let navigate = useNavigate()

    useEffect(() => {
        const onMount = async () => {
            const storageToken = localStorage.getItem('user_token')
            if (storageToken !== null) {
                dispatch_token({ type: 'set-token', value: storageToken })
            }
            const regionsListLocal = await fetchRegions(storageToken)
            setFetchedRegionsListLocal(regionsListLocal)
            setLoadingRegions(false)
            dispatch_regions({ type: 'get-regions', regionsListLocal })
        }
        onMount()
    }, [dispatch_regions, dispatch_token])

    const fetchRegions = async (storageToken: string | null) => {
        try {
            const response = await fetch('/api/regions/all',
            {
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

    const addNewRegion = async () => {
        navigate(ROUTE_ADAPT_REGION_PAGE)
    }

    const handleSearchInputChange = async (event: { target: { value: string } }) => {
        let searchString = event.target.value

        if (searchString?.length === 1) {
            return
        }
        searchString = searchString.toLowerCase()
        let regionsListLocal = fetchedRegionListLocal

        if (searchString !== '') {
            regionsListLocal = regionsListLocal.filter((region) =>
                region.regionId.toString().toLowerCase().includes(searchString) ||
                region.regionName.toLowerCase().includes(searchString) ||
                region.regionState.toLowerCase().includes(searchString) ||
                region.regionDistrict.toLowerCase().includes(searchString))
        }

        dispatch_regions({ type: 'get-regions', regionsListLocal })
    }

    let content
    if (loadingRegions) {
        content = (<p><em>Lädt Regionen... </em></p>)
    } else if (regionsListLocal.length === 0) {    
        console.log(regionsListLocal)
        content = (<p><em>Keine Region gefunden. </em> </p>) 
    } else {
        content = regionsListLocal.map(regionEntry => (
            <Region key={regionEntry.regionId} regionId={regionEntry.regionId} userFunction={regionEntry.regionName} />// hier Rolle mitgeben
        ))
    }

    return (
        <RescueListLayout>
            {!isNotMobile && <Menu />}
            <RescueListRowLayout isNotMobile={isNotMobile}>
                {(isNotMobile) && <Sidebar showSidebar={isNotMobile} />}
                <RescueListColumnLayout>
                    <SearchInput onChange={handleSearchInputChange}
                        isNotMobile={isNotMobile}
                        placeholder={"Suchen"}></SearchInput>
                    <TitleBlock>
                        <PageTitle>Regionenverwaltung</PageTitle>
                        <NewUserButton>
                            <CreateNewUserButton onClick={() => addNewRegion()}> Neue Region erstellen</CreateNewUserButton>
                        </NewUserButton>
                    </TitleBlock>
                        {content}
                </RescueListColumnLayout >
            </RescueListRowLayout>
        </RescueListLayout>
    )
}

const RescueListLayout = styled.div`
    height: 100%;
`

const UserListBlock = styled.div`
    background: #7c6b57;
    margin: 1em; 
    padding: 1em;
    border-radius: 10px;
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

const SearchInput = styled.input<{ isNotMobile: boolean }>` 
    display: flex;
    align-self: flex-end;
    border: 2px solid #7c6b57; 
    border-radius: 8px;
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

const PageTitle = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 2em;
    color: #ffeccb;
    @media (min-width: 700px) {
        margin-left: 0px;
    }
`

const NewUserButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: 1000px) {
        align-items: flex-end;
    }
`

const TitleBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: 1000px) {
        align-items: stretch;
    }
`