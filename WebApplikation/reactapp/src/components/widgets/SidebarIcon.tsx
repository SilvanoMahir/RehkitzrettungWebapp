import styled from "styled-components"

const icon = require('../../resources/fawn.jpg')

export default function SidebarIcon() {

    return (
        <Image alt="icon" src={String(icon)} />
    )
}

export const Image = styled.img`
    width: 300px;
    margin: 15px;
`