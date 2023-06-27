import styled from "styled-components"
import { useState } from "react"
import { Hamburger } from "./Hamburger"
import Sidebar from "./Sidebar/Sidebar"


export const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <StyledMenu open={open}>
        <Sidebar showSidebar={open} />
      </StyledMenu>
      <Hamburger open={open} setOpen={setOpen} />
     </div>
   )
}

const StyledMenu = styled.nav<{ open: boolean }>`
    height: 100%;
    position: fixed;
    background-color: #393e41;
    z-index: 1;
    flex-direction: column;
    display: ${({ open }) => (open ? "flex" : "none")};
    overflow-y: auto;
`