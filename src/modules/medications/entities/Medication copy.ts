export class Medication {
  constructor(
    readonly id: string,
    readonly presentation: string,
    readonly name: string,
    /** Unidade de Medida */
    readonly dosageUnit: string,
    /** Quantidade */
    readonly dosageAmount: number,
    readonly frequencyInMinutes: number,
    readonly usageDurationInDays: number
  ){}
}
