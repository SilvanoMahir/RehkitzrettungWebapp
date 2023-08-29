import { FaListUl } from "react-icons/fa"
import styled from "styled-components"

type Props = {
    open: boolean
    setOpen: (v: boolean) => void
}

export const Hamburger = (props: Props) => (
    <StyledHamburger
        open={props.open}
        onClick={() => props.setOpen(!props.open)}>
        <FaListUl size={24} color="#ffffff" />
    </StyledHamburger>
)

const StyledHamburger = styled.button<{ open: boolean }>`
    position: fixed;
    width: 100%;
    padding: 3vw;
    background: ${(props) => (props.open ? "transparent" : "#393e41")}; 
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: none;
    cursor: pointer;
    outline: none;
    z-index: 1;
`
