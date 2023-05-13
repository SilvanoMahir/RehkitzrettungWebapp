import styled from 'styled-components';
import { CustomButton } from '../controls/Button';

interface Props {
    text: string
    icon: any
}

export default function SidebarButton({ text, icon }: Props) {

    return (
        <RowLayout>
            <Button>{text}{icon}</Button>
        </RowLayout>
    )
}

export const Button = styled.button`
    ${CustomButton};
    background: gray;
    width: 250px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: beige;
`

const RowLayout = styled.div` 
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    margin: 10px;
`