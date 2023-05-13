import styled from "styled-components"

const icon = require('../../resources/fawn.jpg')

export default function SidebarIcon() {

    return (
        <Image alt="icon" src={String(icon)} />
    )
}

const Image = styled.img`
    width: 400px;
    margin: 15px;
`