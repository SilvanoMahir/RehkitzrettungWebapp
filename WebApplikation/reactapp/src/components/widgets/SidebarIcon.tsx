import styled from "styled-components"

const icon = require('../../resources/rescue_logo.png')

export default function SidebarIcon() {

    return (
        <Image alt="icon" src={String(icon)} />
    )
}

const Image = styled.img`
    width: 400px;
    margin: 15px;
`