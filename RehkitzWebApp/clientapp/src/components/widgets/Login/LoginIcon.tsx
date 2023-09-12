import styled from 'styled-components'

const icon = require('../../../resources/rescue_logo.png')

export default function LoginIcon() {

    return (
        <Image alt="icon" src={String(icon)} />
    )
}

const Image = styled.img`
    width: 50%;
    margin: 15px;
    margin-top: -15%;
`