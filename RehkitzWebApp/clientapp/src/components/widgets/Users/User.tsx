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

    const isNotMobile = useMediaQuery({ query: '(min-width: 700px)' })
    const isSmallScreen = useMediaQuery({ query: '(min-width: 1200px)' })

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
            <RowContainer isSmallScreen={isSmallScreen}>
                {isSmallScreen ? <UserBodyLargeScreen userEntry={userEntry} />
                    : <UserBodySmallScreen userEntry={userEntry} />
                }
            </RowContainer>
        </UserLayout>
    )
}

const UserLayout = styled.div`
    @media (max-width: 1200px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: beige;
    }
`

const RowContainer = styled.div<{ isSmallScreen: boolean }>`
    @media (max-width: 1200px) {
        margin: 10px;
        display: flex;
        flex-direction: ${(props) => (props.isSmallScreen ? "row" : "column")};;
        align-self: stretch;
        justify-content: space-around
    }
`
