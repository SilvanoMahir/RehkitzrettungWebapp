import { RegionEntries } from './RegionEntries'

type addRegionAction = {
    type: 'add-region'
    regionsListLocal: RegionEntries[]
    newRegion: RegionEntries
}

type deleteRegionAction = {
    type: 'delete-region'
    regionsListLocal: RegionEntries[]
    regionId: number
}

type getRegionAction = {
    type: 'get-regions'
    regionsListLocal: RegionEntries[]
}

type updateRegionAction = {
    type: 'update-regions'
    regionsListLocal: RegionEntries[]
}

export type ActionRegions = deleteRegionAction | getRegionAction | addRegionAction | updateRegionAction