import styled from "styled-components"
import { UserEntries } from "../../../models/UserEntries"
import UserEntry from "./UserEntry"
import { EditUserButton } from "../../controls/Button"
import { useNavigate } from "react-router-dom"
import { ROUTE_ADAPT_USER_PAGE } from "../../../App"

interface Props {
    userEntry: UserEntries
}

export default function UserBodySmallScreen({ userEntry }: Props) {
    let navigate = useNavigate()

    function editUser(): void {
        navigate(`${ROUTE_ADAPT_USER_PAGE}/${userEntry.userId}`)
    }

    return (
        <ColumnContainer>
            <UserEntry entry="ID" value={userEntry?.userId} />
            <UserEntry entry="Bezeichnung" value={userEntry?.userDefinition} />
            <UserEntry entry="Funktion" value={userEntry?.userFunction} />
            <UserEntry entry="Region" value={userEntry?.userRegion} />
            <UserEditSection>
                <EditUserButton onClick={() => editUser()}>Bearbeiten</EditUserButton>
            </UserEditSection>
        </ColumnContainer>
    )
}

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const UserEditSection = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`