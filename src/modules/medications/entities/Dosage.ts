export class Dosage {
  constructor(
    readonly id: number,
    readonly amount: string,
    readonly unit: string,
    readonly searchable: string,
  ) {}
}