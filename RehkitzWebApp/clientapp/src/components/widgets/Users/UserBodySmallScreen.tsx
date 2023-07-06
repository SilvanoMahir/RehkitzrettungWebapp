import styled from "styled-components"
import { UserEntries } from "../../../models/UserEntries"
import UserEntry from "./UserEntry"
import { EditUserButton } from "../../controls/Button"

interface Props {
    userEntry: UserEntries
}

export default function UserBodySmallScreen({ userEntry }: Props) {

    function editProtocol(): void {
        throw new Error("Function not implemented.")
    }

    return (
        <ColumnContainer>
            <UserEntry entry= "ID" value = { userEntry?.userId } />
            <UserEntry entry= "Bezeichnung" value = { userEntry?.userDefinition } />
            <UserEntry entry= "Funktion" value = { userEntry?.userFunction } />
            <UserEntry entry= "Kanton/Region" value = { userEntry?.userStateRegion }/>
            <EditUserButton onClick={() => editProtocol()}>Bearbeiten</EditUserButton>
        </ColumnContainer>
    )
}

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`