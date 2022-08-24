import { Guid } from 'guid-typescript'

export class EditUserViewModel {

    id: Guid
    userName: string
    displayname: string
    email: string
    isAdmin: boolean
    isActive: boolean

}
