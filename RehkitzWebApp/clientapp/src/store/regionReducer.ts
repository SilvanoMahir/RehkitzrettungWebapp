import { ActionRegions } from '../models/RegionActions'
import { RegionState } from '../models/RegionState'

export function regionReducer(state: RegionState, action: ActionRegions): RegionState {
    switch (action.type) {
        case 'add-region':
            return {
                ...state,
                regionsListLocal: [...action.regionsListLocal, action.newRegion]
            }

        case 'delete-region':
            return {
                ...state,
                regionsListLocal: state.regionsListLocal.filter(regions => regions.regionId !== action.regionId)
            }

        case 'get-regions':
            return {
                ...state,
                regionsListLocal: action.regionsListLocal
            }
        
        case 'update-regions':
            return {
                ...state,
                regionsListLocal: action.regionsListLocal
            }
    }
}

export const initialRegionState: RegionState = {
    regionsListLocal: []
}