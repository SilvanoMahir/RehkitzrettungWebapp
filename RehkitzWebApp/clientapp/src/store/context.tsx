import { ActionProtocols } from '../models/ProtocolActions'
import { ProtocolState } from '../models/ProtocolsState'
import { createContext, ReactNode, useReducer } from 'react'
import { protocolReducer, initialProtocolsState } from './protocolReducer'
import { Action } from '../models/AuthActions'
import { AuthState } from '../models/AuthState'
import { initialAuthState, authReducer } from './authReducer'
import { initialUserState, userReducer } from './userReducer'
import { ActionUsers } from '../models/UserActions'
import { UserState } from '../models/UserState'

interface AppState1 extends ProtocolState {
  dispatch: (action: ActionProtocols) => void
}

const initialState1: AppState1 = {
  ...initialProtocolsState,
  dispatch: (action: ActionProtocols) => {},
}

export const ProtocolsContext = createContext<AppState1>(initialState1)

interface Props {
  children: ReactNode
}

export const ProtocolProvider = ({ children }: Props) => {
  const [protocolsState, dispatch] = useReducer(protocolReducer, initialState1)

  const protocolsStore = {
    ...protocolsState,
    dispatch,
  }

  return (
    <ProtocolsContext.Provider value={protocolsStore}>{children}</ProtocolsContext.Provider>
  )
}



interface AppState2 extends AuthState {
  dispatch_token: (action: Action) => void
}

const initialState: AppState2 = {
    ...initialAuthState,
    dispatch_token: (action: Action) => { }
}

export const AppContext = createContext<AppState2>(initialState)

interface Props {
    children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
    const [state, dispatch_token] = useReducer(authReducer, initialState)

    const appStore = {
        ...state,
        dispatch_token
    }

    return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>
}



interface AppState3 extends UserState {
  dispatch: (action: ActionUsers) => void
}

const initialState2: AppState3 = {
  ...initialUserState,
  dispatch: (action: ActionUsers) => {},
}

export const UserContext = createContext<AppState3>(initialState2)

interface Props {
  children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const [userState, dispatch] = useReducer(userReducer, initialState2)

  const userAppStore = {
    ...userState,
    dispatch,
  }

  return (
    <UserContext.Provider value={userAppStore}>{children}</UserContext.Provider>
  )
}