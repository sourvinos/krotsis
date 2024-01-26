import { Metadata } from 'src/app/shared/classes/metadata'

export interface ColorReadDto extends Metadata {

    // PK
    id: number
    // Fields
    description: string
    isActive: boolean
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
