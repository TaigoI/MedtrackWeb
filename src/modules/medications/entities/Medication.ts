// export class Medication {
//   constructor(
//     readonly id: string,
//     readonly name: string,
//     readonly searchable: string,
//   ){}
// }

export class Medication {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly doseUnit: string,
    readonly doseAmount: number,
    readonly frequencyInMinutes: number,
    readonly usageDurationInDays: number
  ){}
}