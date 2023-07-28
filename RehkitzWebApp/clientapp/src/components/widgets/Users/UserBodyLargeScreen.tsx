import styled from "styled-components"
import { UserEntries } from "../../../models/UserEntries"
import { EditUserButton } from "../../controls/Button"
import { ROUTE_ADAPT_USER_PAGE } from "../../../App"
import { useNavigate } from "react-router-dom"

interface Props {
    userEntry: UserEntries
}

export default function UserBodyLargeScreen({ userEntry }: Props) {
    let navigate = useNavigate()

    function editUser(): void {
        navigate(`${ROUTE_ADAPT_USER_PAGE}/${userEntry.userId}`)
    }
    return (
        <RowContainer>
            <TextField> {userEntry?.userId}</TextField>
            <TextField> {userEntry?.userDefinition}</TextField>
            <TextField> {userEntry?.userFunction}</TextField>
            <TextField> {userEntry?.userRegion}</TextField>
            <ButtonBox>
                <EditUserButton onClick={() => editUser()}>Bearbeiten</EditUserButton>
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
    font-size: 1.25em;
`

const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
`