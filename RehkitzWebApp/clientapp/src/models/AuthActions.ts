type SetFieldAction = {
    type: 'set-username' | 'set-password' | 'set-token' | 'set-user-id'
    value: string
}

type SignInAction = {
    type: 'sign-in'
}

type LogOutAction = {
    type: 'log-out'
}

export type Action = SetFieldAction | SignInAction | LogOutAction