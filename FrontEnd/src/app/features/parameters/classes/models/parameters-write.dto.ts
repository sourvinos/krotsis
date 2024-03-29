import { Guid } from 'guid-typescript'

export interface ParametersWriteDto {

    // PK
    id: Guid
    // Fields
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
    putAt: string

}
