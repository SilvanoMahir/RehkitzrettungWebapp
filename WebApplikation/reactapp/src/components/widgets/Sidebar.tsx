import { FaInfo, FaListUl, FaMap, FaRegArrowAltCircleRight, FaUser, FaUsers } from "react-icons/fa"
import styled from "styled-components"
import SidebarButton from "./SidebarButton"
import SidebarIcon from "./SidebarIcon"

export default function Sidebar() {

    return (
        <SidebarColumnLayout>
            <SidebarIcon />
            <SidebarTitle>Willkommen zur Rehkitzrettung App</SidebarTitle>
            <SidebarButton text="Meine Daten" icon=<FaUser />/>
            <SidebarButton text="Rettungen" icon=<FaListUl />/>
            <SidebarButton text="Karte" icon=<FaMap />/>
            <SidebarButton text="Organisation" icon=<FaUsers />/>
            <SidebarButton text="Information" icon=<FaInfo />/>
            <SidebarButton text="Abmelden" icon=<FaRegArrowAltCircleRight />/>
        </SidebarColumnLayout>
    )
}

export const SidebarColumnLayout = styled.div`
    border: 1px solid gray;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
`

export const SidebarTitle = styled.div`
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 10px;
`