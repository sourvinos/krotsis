import { Metadata } from 'src/app/shared/classes/metadata'

export interface ParametersReadDto extends Metadata {

    id: number
    lineA: string
    lineB: string
    lineC: string
    lineD: string
    lineE: string
    lineF: string
    lineG: string
    lineH: string
    customerA: string
    customerB: string
    customerC: string
    customerD: string
    customerE: string
    customerF: string
    customerG: string
    customerH: string
    phones: string
    email: string
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string


}
