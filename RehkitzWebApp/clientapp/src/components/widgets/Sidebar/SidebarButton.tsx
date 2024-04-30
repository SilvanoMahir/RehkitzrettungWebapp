import styled from 'styled-components'
import { CustomButton } from '../../controls/Button'

interface Props {
    text: string
    onClick: () => void
    icon: any
}

export default function SidebarButton({ text, icon, onClick }: Props) {
    return (
        <RowLayout>
            <Button onClick={onClick}>{text}{icon}</Button>
        </RowLayout>
    )
}

export const Button = styled.button`
    ${CustomButton};
    background: #8c8c8c;
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: beige;
    padding: 0.5em;
`

const RowLayout = styled.div` 
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-evenly;
    margin: 0.5em;
`