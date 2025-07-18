import { ActionUsers } from '../models/UserActions'
import { UserState } from '../models/UserState'

export function userReducer(state: UserState, action: ActionUsers): UserState {
    switch (action.type) {
        case 'add-user':
            return {
                ...state,
                usersListLocal: [...action.usersListLocal, action.newUser]
            }

        case 'delete-user':
            return {
                ...state,
                usersListLocal: state.usersListLocal.filter(users => users.userId !== action.userId)
            }

        case 'get-users':
            return {
                ...state,
                usersListLocal: action.usersListLocal
            }
        
        case 'update-users':
            return {
                ...state,
                usersListLocal: action.usersListLocal
            }
    }
}

export const initialUserState: UserState = {
    usersListLocal: []
}