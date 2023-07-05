import styled from "styled-components"
import { UserEntries } from "../../../models/UserEntries"
import UserEntry from "./UserEntry"

interface Props {
    userEntry: UserEntries
}

export default function UserBodySmallScreen({ userEntry }: Props) {

    return (
        <ColumnContainer>
            <UserEntry entry= "ID" value = { userEntry?.userId } />
            <UserEntry entry= "Bezeichnung" value = { userEntry?.userFirstName } />
            <UserEntry entry= "Funktion" value = { userEntry?.userLastName } />
            <UserEntry entry= "Kanton/Region" value = { userEntry?.userRegion } />
        </ColumnContainer>
    )
}

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`