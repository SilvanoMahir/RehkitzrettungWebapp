import styled from 'styled-components/macro'
import { useContext, useState, useEffect } from 'react'
import { EditUserButton } from '../../controls/Button'
import { useMediaQuery } from 'react-responsive'
import { AppContext, UserContext } from '../../../store/context'
import { UserEntries } from '../../../models/UserEntries'
import UserBodySmallScreen from './UserBodySmallScreen'
import UserBodyLargeScreen from './UserBodyLargeScreen'


interface Props {
      userId: string
}

export default function Users({userId}: Props) {

    const isNotMobile = useMediaQuery({ query: '(min-width: 426px)' })
    //const { protocolId } = useParams() --> not working now as Router not set, there used Props
    const { token } = useContext(AppContext)
    const { usersListLocal, dispatch_users } = useContext(UserContext)
    const [userEntry, setUserEntry] = useState<UserEntries>({
        userId: "",
        userFirstName: "",
        userLastName: "",
        userRegion: "",
        ownerId: ""
      })

      useEffect(() => {
        const onMount = async () => {
          const data = usersListLocal.filter(user => user.userId === userId);
          setUserEntry(data[0]);
        }
        onMount();
      }, [usersListLocal, userId]);

    const editProtocol = async () => {
    }

    return (
        <UserLayout>
            <RowContainer isNotMobile={isNotMobile}>
              {isNotMobile ? <><UserBodyLargeScreen userEntry={userEntry} /></>
              : <><UserBodySmallScreen userEntry={userEntry} />
              <EditUserButton onClick={() => editProtocol()}>Bearbeiten</EditUserButton></>
            }
            </RowContainer>
      </UserLayout>
    )
}

const UserLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: beige;
`

const RowContainer = styled.div<{ isNotMobile: boolean }>`
    margin: 10px;
    display: flex;
    flex-direction: ${(props) => (props.isNotMobile ? "row" : "column")};;
    align-self: stretch;
    justify-content: space-around
`
