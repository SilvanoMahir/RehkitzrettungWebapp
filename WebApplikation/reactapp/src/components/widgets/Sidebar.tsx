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

const SidebarColumnLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: black;
`

const SidebarTitle = styled.div`
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 10px;
    margin: 10px 15px 10px;
    color: beige;
`