import styled from "styled-components"
import { UserEntries } from "../../../models/UserEntries"
import { EditUserButton } from "../../controls/Button"

interface Props {
    userEntry: UserEntries
}

export default function UserBodyLargeScreen({ userEntry }: Props) {

    function editProtocol(): void {
        throw new Error("Function not implemented.")
    }

    return (
        <RowContainer>
            <TextField> {userEntry?.userId}</TextField>
            <TextField> {userEntry?.userDefinition}</TextField>
            <TextField> {userEntry?.userFunction}</TextField>
            <TextField> {userEntry?.userRegion}</TextField>
            <ButtonBox>
                <EditUserButton onClick={() => editProtocol()}>Bearbeiten</EditUserButton>
            </ButtonBox>
        </RowContainer>
    )
}

const RowContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: stretch;
    align-items: center;
`

const TextField = styled.text`
    color: #fffecb;
    display: flex;
    justify-content: center;
`

const ButtonBox = styled.div`
    display: flex;
`