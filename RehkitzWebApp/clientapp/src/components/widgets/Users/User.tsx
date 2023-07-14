import styled from 'styled-components/macro'
import { useContext, useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { UserContext } from '../../../store/context'
import { UserEntries } from '../../../models/UserEntries'
import UserBodySmallScreen from './UserBodySmallScreen'
import UserBodyLargeScreen from './UserBodyLargeScreen'

interface Props {
    userId: number
}

export default function Users({ userId }: Props) {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })
    const { usersListLocal } = useContext(UserContext)
    const [userEntry, setUserEntry] = useState<UserEntries>({
        userId: 0,
        username: "",
        userFirstName: "",
        userLastName: "",
        userRegion: "",
        userDefinition: "",
        userFunction: "",
        userMail: "",
        userPassword: ""
    })

    useEffect(() => {
        const onMount = async () => {
            const data = usersListLocal.filter(user => user.userId === userId);
            setUserEntry(data[0]);
        }
        onMount();
    }, [usersListLocal, userId]);

    return (
        <UserLayout>
            <RowContainer isNotMobile={isNotMobile}>
                {isNotMobile ? <UserBodyLargeScreen userEntry={userEntry} />
                    : <UserBodySmallScreen userEntry={userEntry} />
                }
            </RowContainer>
        </UserLayout>
    )
}

const UserLayout = styled.div`
    @media (max-width: 426px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: beige;
    }
`

const RowContainer = styled.div<{ isNotMobile: boolean }>`
    @media (max-width: 426px) {
        margin: 10px;
        display: flex;
        flex-direction: ${(props) => (props.isNotMobile ? "row" : "column")};;
        align-self: stretch;
        justify-content: space-around
    }
`
