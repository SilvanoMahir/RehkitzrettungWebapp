import { ActionProtocols } from 'models/ProtocolActions'
import { ProtocolState } from 'models/ProtocolsState'

export function protocolReducer(state: ProtocolState, action: ActionProtocols): ProtocolState {
  switch (action.type) {
    case 'add-protocols':
      return {
        ...state,
        protocolsListLocal: [...action.protocolsListLocal, action.newProtocol] 
      }

    case 'delete-protocols':
      return {
        ...state,
        protocolsListLocal: state.protocolsListLocal.filter(protocols => protocols.protocolId !== action.protocolId)
      }
    
    case 'get-protocols':
      return {
        ...state,
        protocolsListLocal: action.protocolsListLocal
      }
  }
}

export const initialProtocolsState: ProtocolState = {
  protocolsListLocal: []
}
