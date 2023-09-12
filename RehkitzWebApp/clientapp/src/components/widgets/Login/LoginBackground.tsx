import styled from 'styled-components'

const icon = require('../../../resources/field.png')

export default function LoginBackground() {

    return (
        <Image alt="icon" src={String(icon)} />
    )
}

const Image = styled.img`
    width: 100%;
    height: 25vh;
    object-fit: cover;
`