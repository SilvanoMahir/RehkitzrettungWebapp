import styled, { css } from 'styled-components/macro'

interface Props {
    onClick: () => void
    children: string
}

export const Button = ({ onClick, children }: Props) => {
    return <button onClick={onClick}>{children}</button>
}

export const CustomButton = css`
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: #def2f1;
    font-size: 25px;
    font-weight: 500;
    padding: 4px 8px;
`

export const DownloadProtocolButton = styled.button`
    ${CustomButton};
    background: gray;
    margin: 10px;
    font-size: 20px;
`

export const CreateProtocolButton = styled.button`
    ${CustomButton};
    background: gray;
    margin: 10px;
    font-size: 20px;
`
export const DeleteProtocolButton = styled.button`
    ${CustomButton};
    background: red;
    margin-top: 20px;
`

export const EditProtocolButton = styled.button`
    ${CustomButton};
    background: green;
    margin-top: 20px;
`

export const LoginButton = styled.button`
    ${CustomButton};
    background: #16d129;
    color: #fffecb;
    font-size: 20px;
    padding: 15px;
    margin: 20px;
`

export const EditUserButton = styled.button`
    ${CustomButton};
    background: green;
    margin-top: 20px;
`