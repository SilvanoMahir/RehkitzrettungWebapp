import styled from "styled-components"
import { FaListUl } from "react-icons/fa"
import SidebarButton from "./SidebarButton"

export default function Menubar() {

    const showSidebar = async () => {
    }

    return (
        <Bar>
            <SidebarButton onClick={() => showSidebar()} text="" icon=<FaListUl /> />
        </Bar>
    )
}

const Bar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    background: #393e41;
`