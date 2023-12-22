import { Metadata } from 'src/app/shared/classes/metadata'

export interface ParametersReadDto extends Metadata {

    // PK
    id: number
    // Fields
    phones: string
    email: string

}
