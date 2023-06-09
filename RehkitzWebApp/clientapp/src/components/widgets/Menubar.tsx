import styled from "styled-components"
import { FaListUl } from "react-icons/fa"
import SidebarButton from "./SidebarButton"

interface Props {
    showSidebar: boolean
    setShowSidebar: (arg0: boolean) => void
}

export default function Menubar({ showSidebar, setShowSidebar }: Props) {

    return (
        <Bar>
            <SidebarButton onClick={() => setShowSidebar(!showSidebar)} text="" icon=<FaListUl /> />
        </Bar>
    )
}

const Bar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    background: #393e41;
`