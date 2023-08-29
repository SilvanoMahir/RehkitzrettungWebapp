export interface JwtPayload {
    userId: string
    userDistrict: string
    userRegion: string
    userOwnerId: string
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string
}