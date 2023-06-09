import { FaInfo, FaListUl, FaMap, FaRegArrowAltCircleRight, FaUser, FaUsers } from "react-icons/fa"
import styled from "styled-components"
import SidebarButton from "./SidebarButton"
import SidebarIcon from "./SidebarIcon"
import { useContext } from "react"
import { AppContext } from '../../store/context'
import { ROUTE_LOGIN_PAGE } from '../../App'
import { useNavigate } from "react-router"
import { useMediaQuery } from "react-responsive"

export default function Sidebar() {

    const isMobile = useMediaQuery({ query: '(min-width: 376px)' })

    const { dispatch } = useContext(AppContext)
    let navigate = useNavigate()
    function logout(): void {
        dispatch({ type: 'set-token', value: '' })
        localStorage.removeItem("user_token")
        navigate(ROUTE_LOGIN_PAGE)
    }
    function moveToInformation(): void {
        throw new Error("Function not implemented.")
    }
    function moveToOrganisation(): void {
        throw new Error("Function not implemented.")
    }
    function moveToMyData(): void {
        throw new Error("Function not implemented.")
    }
    function moveToSavings(): void {
        throw new Error("Function not implemented.")
    }
    function moveToMap(): void {
        throw new Error("Function not implemented.")
    }

    return (
        <div> {
            isMobile && 
            <SidebarColumnLayout>
                <SidebarIcon />
                <SidebarTitle>Willkommen zur Rehkitzrettung App</SidebarTitle>
                <SidebarButton onClick={() => moveToMyData()} text="Meine Daten" icon=<FaUser /> />
                <SidebarButton onClick={() => moveToSavings()} text="Rettungen" icon=<FaListUl /> />
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
`

const SidebarTitle = styled.div`
    text-align: center;
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 10px;
    margin: 10px 15px 10px;
    color: beige;
`