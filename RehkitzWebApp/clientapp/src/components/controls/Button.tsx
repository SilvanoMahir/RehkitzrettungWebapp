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
    font-size: 1.5em;
    font-weight: 500;
    padding: 4px 8px;
`

export const DownloadProtocolButton = styled.button`
    ${CustomButton};
    background: #3a605a;
    margin: 10px;
    font-size: 25px;
`

export const CreateProtocolButton = styled.button`
    ${CustomButton};
    background: #3a605a;
    margin: 10px;
    font-size: 25px;
`
export const DeleteProtocolButton = styled.button`
    ${CustomButton};
    background: #c25450;
    margin-top: 20px;
`

export const EditProtocolButton = styled.button`
    ${CustomButton};
    background: #3e765d;
    margin-top: 20px;
`

export const DiscardProtocolButton = styled.button`
    ${CustomButton};
    background: #c08521;
    margin-top: 20px;
`

export const DiscardUserButton = styled.button`
    ${CustomButton};
    background: #c08521;
    margin-top: 20px;
`

export const DeleteUserButton = styled.button`
    ${CustomButton};
    background: #be4e2c;
    margin-top: 20px;
`

export const SaveProtocolButton = styled.button`
    ${CustomButton};
    background: #3e765d;
    margin-top: 20px;
`

export const LoginButton = styled.button`
    ${CustomButton};
    background: #3e765d;
    color: #ffeccb;
    font-size: 20px;
    padding: 15px;
    margin: 20px;
`

export const EditUserButton = styled.button`
    ${CustomButton};
    background: #3e765d;
    margin-top: 1em;
    max-width: 10em;
`

export const CreateNewUserButton = styled.button`
    ${CustomButton};
    background: #3a605a;
    margin: 10px;
    font-size: 25px;
`