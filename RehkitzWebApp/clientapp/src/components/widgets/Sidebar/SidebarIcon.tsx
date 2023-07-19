import styled from "styled-components"

const icon = require('../../../resources/rescue_logo.png')

export default function SidebarIcon() {

    return (
        <Image alt="icon" src={String(icon)} />
    )
}

const Image = styled.img`
    width: 65%;
    margin: 0.75em;
    @media (max-width: 700px) {
        width: 45%;
    }

`