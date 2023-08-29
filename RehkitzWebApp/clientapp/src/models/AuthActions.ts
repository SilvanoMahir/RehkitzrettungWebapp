type SetFieldAction = {
    type: 'set-username' | 'set-password' | 'set-token' 
    value: string
}

type SignInAction = {
    type: 'sign-in'
}

type LogOutAction = {
    type: 'log-out'
}

export type Action = SetFieldAction | SignInAction | LogOutAction