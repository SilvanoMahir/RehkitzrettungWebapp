import { Action } from '../models/AuthActions'
import { AuthState } from '../models/AuthState'

export function authReducer(state: AuthState, action: Action): AuthState {
    switch (action.type) {
        case 'set-token':
            return {
                ...state,
                token: action.value
            }
        case 'set-username':
            return {
                ...state,
                username: action.value
            }
        case 'set-password':
            return {
                ...state,
                password: action.value
            }
        case 'sign-in':
            return {
                ...state,
                authenticated: true
            }
        case 'set-user-id':
            return {
                ...state,
                userId: action.value
            }
        case 'log-out':
            return initialAuthState
    }
}

export const initialAuthState: AuthState = {
    token: '',
    username: '',
    password: '',
    authenticated: false,
    userId: ''
}
