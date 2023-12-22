import { Metadata } from 'src/app/shared/classes/metadata'

export interface ItemReadDto extends Metadata {

    // PK
    id: number
    // Fields
    description: string
    vatPercent: number
    netPrice: number
    grossPrice: number
    isActive: boolean
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
