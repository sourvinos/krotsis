import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface Item {

    id: number
    color: SimpleEntity
    description: string
    varPercent: number
    qty: number
    netPrice: number
    grossPrice: number
    totalGrossPrice: number
    isActive: boolean

}
