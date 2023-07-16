import { UserEntries } from "./UserEntries"

type addUserAction = {
    type: 'add-user'
    usersListLocal: UserEntries[]
    newUser: UserEntries
}

type deleteUserAction = {
    type: 'delete-user'
    usersListLocal: UserEntries[]
    userId: number
}

type getUserAction = {
    type: 'get-users'
    usersListLocal: UserEntries[]
}

type updateUserAction = {
    type: 'update-users'
    usersListLocal: UserEntries[]
}


export type ActionUsers = deleteUserAction | getUserAction | addUserAction | updateUserAction