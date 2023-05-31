import { ActionProtocols } from '../models/ProtocolActions'
import { ProtocolState } from '../models/ProtocolsState'
import { createContext, ReactNode, useReducer } from 'react'
import { protocolReducer, initialProtocolsState } from './protocolReducer'

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

