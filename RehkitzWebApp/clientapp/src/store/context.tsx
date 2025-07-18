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
import { RegionState } from '../models/RegionState'
import { ActionRegions } from '../models/RegionActions'
import { initialRegionState, regionReducer } from './regionReducer'

interface AppState1 extends ProtocolState {
    dispatch_protocols: (action: ActionProtocols) => void
}

const initialState1: AppState1 = {
    ...initialProtocolsState,
    dispatch_protocols: (action: ActionProtocols) => { },
}

export const ProtocolsContext = createContext<AppState1>(initialState1)

interface Props {
    children: ReactNode
}

export const ProtocolProvider = ({ children }: Props) => {
    const [protocolsState, dispatch_protocols] = useReducer(protocolReducer, initialState1)

    const protocolsStore = {
        ...protocolsState,
        dispatch_protocols,
    }

    return (
        <ProtocolsContext.Provider value={protocolsStore}>{children}</ProtocolsContext.Provider>
    )
}

//*********************************************************************************** */

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

//************************************************************************************ */

interface AppState3 extends UserState {
    dispatch_users: (action: ActionUsers) => void
}

const initialState2: AppState3 = {
    ...initialUserState,
    dispatch_users: (action: ActionUsers) => { },
}

export const UserContext = createContext<AppState3>(initialState2)

interface Props {
    children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
    const [userState, dispatch_users] = useReducer(userReducer, initialState2)

    const userAppStore = {
        ...userState,
        dispatch_users,
    }

    return (
        <UserContext.Provider value={userAppStore}>{children}</UserContext.Provider>
    )
}

//*********************************************************************************** */

interface AppState4 extends RegionState {
    dispatch_regions: (action: ActionRegions) => void
}

const initialState3: AppState4 = {
    ...initialRegionState,
    dispatch_regions: (action: ActionRegions) => { },
}

export const RegionContext = createContext<AppState4>(initialState3)

interface Props {
    children: ReactNode
}

export const RegionProvider = ({ children }: Props) => {
    const [regionState, dispatch_regions] = useReducer(regionReducer, initialState3)

    const regionAppStore = {
        ...regionState,
        dispatch_regions,
    }

    return (
        <RegionContext.Provider value={regionAppStore}>{children}</RegionContext.Provider>
    )
}