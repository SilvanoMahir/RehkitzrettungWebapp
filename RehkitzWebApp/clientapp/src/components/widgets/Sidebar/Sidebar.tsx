import { FaInfo, FaListUl, FaMap, FaRegArrowAltCircleRight, FaUser  } from 'react-icons/fa'
import { FaUsersGear } from "react-icons/fa6";
import { BsHouseGearFill } from "react-icons/bs"
import styled from 'styled-components'
import SidebarButton from '../Sidebar/SidebarButton'
import SidebarIcon from '../Sidebar/SidebarIcon'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../store/context'
import { ROUTE_MAIN_PAGE, ROUTE_LOGIN_PAGE, ROUTE_MAP_PAGE, ROUTE_RESCUE_LIST_PAGE, ROUTE_USER_LIST_PAGE, ROUTE_REGION_LIST_PAGE, ROUTE_MY_DATA_PAGE } from '../../../App'
import { useNavigate } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import jwt_decode from 'jwt-decode'
import { JwtPayload } from '../../../interfaces/jwtPayload'

interface Props {
    showSidebar: boolean
}

export default function Sidebar({ showSidebar }: Props) {

    // the negated form "isNotMobile" is used since there were issues
    // regarding the responsive design when using "isMobile" with "max-width"
    const isNotMobile = useMediaQuery({ query: '(min-width: 700px)' })
    const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' })

    const { dispatch_token } = useContext(AppContext)
    const [userFunction, setUserFunction] = useState('')
    let navigate = useNavigate()

    useEffect(() => {
        const onMount = async () => {
            const storageToken = localStorage.getItem('user_token')
            if (storageToken !== null) {
                dispatch_token({ type: 'set-token', value: storageToken })
            }
            let decoded = jwt_decode(storageToken as string) as JwtPayload
            const userFunction = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            setUserFunction(userFunction)
        }
        onMount()
    }, [userFunction, dispatch_token])

    function logout(): void {
        dispatch_token({ type: 'set-token', value: '' })
        localStorage.removeItem("user_token")
        navigate(ROUTE_LOGIN_PAGE)
    }

    function moveToInformation(): void {
        navigate(ROUTE_MAIN_PAGE)
    }

    function moveToOrganisation(): void {
        navigate(ROUTE_USER_LIST_PAGE)
    }

    function moveToRegionAdministration(): void {
        navigate(ROUTE_REGION_LIST_PAGE)
    }

    function moveToMyData(): void {
        navigate(ROUTE_MY_DATA_PAGE)
    }

    function moveToRescues(): void {
        navigate(ROUTE_RESCUE_LIST_PAGE)
    }

    function moveToMap(): void {
        navigate(ROUTE_MAP_PAGE)
    }

    return (
        <SidebarDiv isNotMobile={isNotMobile} isLargeScreen={isLargeScreen}>
            {(isNotMobile || showSidebar) && (
                <SidebarColumnLayout>
                    <SidebarIcon />
                    <SidebarTitle>Willkommen zur Rehkitzrettung App</SidebarTitle>
                    <SidebarButton onClick={moveToMyData} text="Meine Daten" icon={<FaUser />} />
                    <SidebarButton onClick={moveToRescues} text="Rettungen" icon={<FaListUl />} />
                    <SidebarButton onClick={moveToMap} text="Karte" icon={<FaMap />} />
                    {(userFunction === 'Admin' || userFunction === 'Zentrale') && (
                        <SidebarButton onClick={moveToOrganisation} text="Benutzerverwaltung" icon={<FaUsersGear />} />
                    )}
                    {(userFunction === 'Admin' || userFunction === 'Zentrale') && (
                        <SidebarButton onClick={moveToRegionAdministration} text="Regionenverwaltung" icon={<BsHouseGearFill />} />
                    )}
                    <SidebarButton onClick={moveToInformation} text="Information" icon={<FaInfo />} />
                    <SidebarButton onClick={logout} text="Abmelden" icon={<FaRegArrowAltCircleRight />} />
                </SidebarColumnLayout>
            )}
        </SidebarDiv>
    )
}

const SidebarDiv = styled.div<{ isNotMobile: boolean; isLargeScreen: boolean }>`
    max-width: ${({ isNotMobile }) => (isNotMobile ? "30%" : "100%")};
    transition: max-width 0.3s ease-in-out;
    overflow: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background: #393e41;
    @media (min-height: 750px) {
        overflow-y: none;
    }
`

const SidebarColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #393e41;
    width: 100%;
    @media (min-height: 700px) {
      height: 100%;
    }
`

const SidebarTitle = styled.div`
    text-align: center;
    font-weight: 500;
    font-size: 1.5em;
    margin: 1em;
    color: beige;
`