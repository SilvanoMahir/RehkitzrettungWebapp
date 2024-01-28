import styled from 'styled-components'
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

    const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' })

    const { usersListLocal } = useContext(UserContext)
    const [userEntry, setUserEntry] = useState<UserEntries>({
        userId: 0,
        userName: "",
        userFirstName: "",
        userLastName: "",
        userRegion: "",
        userDefinition: "",
        userFunction: "",
        userPassword: ""
    })

    useEffect(() => {
        const onMount = async () => {
            const data = usersListLocal.filter(user => user.userId === userId)
            setUserEntry(data[0])
        }
        onMount()
    }, [usersListLocal, userId])

    return (
        <UserLayout>
            <RowContainer isLargeScreen={isLargeScreen}>
                {isLargeScreen ? <UserBodyLargeScreen userEntry={userEntry} />
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

const RowContainer = styled.div<{ isLargeScreen: boolean }>`
    @media (max-width: 1200px) {
        margin: 10px;
        display: flex;
        flex-direction: ${(props) => (props.isLargeScreen ? "row" : "column")};
        align-self: stretch;
        justify-content: space-around
    }
`
