import styled from "styled-components"

const icon = require('../../resources/rescue_logo.png')

export default function LoginIcon() {

    return (
        <Image alt="icon" src={String(icon)} />
    )
}

const Image = styled.img`
    width: 300px;
    margin: 15px;
`