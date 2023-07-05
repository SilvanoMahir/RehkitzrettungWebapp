import styled from "styled-components"
import UserEntry from "./UserEntry"
import { UserEntries } from "../../../models/UserEntries"

interface Props {
    userEntry: UserEntries
}

export default function UserBodyLargeScreen({ userEntry }: Props) {

    return (
        <RowContainer>
            <UserEntry entry= "" value = { userEntry?.userId } />
            <UserEntry entry= "" value = { userEntry?.userFirstName } />
            <UserEntry entry= "" value = { userEntry?.userLastName } />
            <UserEntry entry= "" value = { userEntry?.userLastName } />
        </RowContainer>
    )
}

const UserOverviewTitles= styled.div`
    display: flex;
    flex-direction: row;
    align-self: stretch;
    width: 100%;
`

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: stretch;
    width: 100%;
    flex: 1;
`