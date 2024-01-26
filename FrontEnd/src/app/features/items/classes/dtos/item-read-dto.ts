import { Metadata } from 'src/app/shared/classes/metadata'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface ItemReadDto extends Metadata {

    // PK
    id: number
    // Objects
    color: SimpleEntity
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
