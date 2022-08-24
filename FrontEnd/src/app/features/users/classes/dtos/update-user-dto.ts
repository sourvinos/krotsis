import { Guid } from 'guid-typescript'

export interface UpdateUserDto {

    id: Guid
    userName: string
    displayname: string
    email: string
    isAdmin: boolean
    isActive: boolean

}
