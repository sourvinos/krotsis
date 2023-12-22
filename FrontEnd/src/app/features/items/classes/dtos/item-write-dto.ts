export interface ItemWriteDto {

    // PK
    id: number
    // Fields
    description: string
    vatPercent: number
    netPrice: number
    grossPrice: number
    isActive: boolean
    // Rowversion
    putAt: string

}
