import { FaInfo, FaListUl, FaMap, FaRegArrowAltCircleRight, FaUser, FaUsers } from "react-icons/fa"
import styled from "styled-components"
import SidebarButton from "../Sidebar/SidebarButton"
import SidebarIcon from "../Sidebar/SidebarIcon"
import { useContext } from "react"
import { AppContext } from '../../../store/context'
import { MAIN_PAGE, ROUTE_LOGIN_PAGE,ROUTE_MAP_PAGE, ROUTE_RESCUE_LIST_PAGE, ROUTE_USER_LIST_PAGE } from '../../../App'
import { useNavigate } from "react-router"
import { useMediaQuery } from "react-responsive"

interface Props {
    showSidebar: boolean
}

export default function Sidebar({ showSidebar }: Props) {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })
    const { dispatch_token } = useContext(AppContext)
    let navigate = useNavigate()

    function logout(): void {
        dispatch_token({ type: 'set-token', value: '' })
        localStorage.removeItem("user_token")
        navigate(ROUTE_LOGIN_PAGE)
    }

    function moveToInformation(): void {
        navigate(MAIN_PAGE)
    }

    function moveToOrganisation(): void {
        navigate(ROUTE_USER_LIST_PAGE)
    }

    function moveToMyData(): void {
        throw new Error("Function not implemented.")
    }

    function moveToRescues(): void {
        navigate(ROUTE_RESCUE_LIST_PAGE)
    }

    function moveToMap(): void {
        navigate(ROUTE_MAP_PAGE)
    }

    return (
        <div> {
            (isNotMobile || showSidebar) &&
            <SidebarColumnLayout>
                <SidebarIcon />
                <SidebarTitle>Willkommen zur Rehkitzrettung App</SidebarTitle>
                <SidebarButton onClick={() => moveToMyData()} text="Meine Daten" icon=<FaUser /> />
                <SidebarButton onClick={() => moveToRescues()} text="Rettungen" icon=<FaListUl /> />
                <SidebarButton onClick={() => moveToMap()} text="Karte" icon=<FaMap /> />
                <SidebarButton onClick={() => moveToOrganisation()} text="Organisation" icon=<FaUsers /> />
                <SidebarButton onClick={() => moveToInformation()} text="Information" icon=<FaInfo /> />
                <SidebarButton onClick={() => logout()} text="Abmelden" icon=<FaRegArrowAltCircleRight /> />
            </SidebarColumnLayout>
        }
        </div>
    )
}

const SidebarColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #393e41;
    height: 100%;
`

const SidebarTitle = styled.div`
    text-align: center;
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 10px;
    margin: 10px 15px 10px;
    color: beige;
`