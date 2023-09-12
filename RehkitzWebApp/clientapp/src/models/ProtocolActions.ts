import { ProtocolEntries } from './ProtocolEntries'

type addProtocolsAction = {
    type: 'add-protocols'
    protocolsListLocal: ProtocolEntries[]
    newProtocol: ProtocolEntries
}

type deleteProtocolsAction = {
    type: 'delete-protocols'
    protocolsListLocal: ProtocolEntries[]
    protocolId: string
}

type getProtocolsAction = {
    type: 'get-protocols'
    protocolsListLocal: ProtocolEntries[]
}

type updateProtocolsAction = {
    type: 'update-protocols'
    protocolsListLocal: ProtocolEntries[]
}

export type ActionProtocols = deleteProtocolsAction | getProtocolsAction | addProtocolsAction | updateProtocolsAction