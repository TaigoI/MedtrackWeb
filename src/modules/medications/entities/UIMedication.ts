import { Medication } from "./Medication";

export class UIMedication extends Medication {
  constructor(
    public checked: boolean,
    readonly id: string,
    readonly name: string,
    readonly doseUnit: string,
    readonly doseAmount: number,
    readonly frequencyInMinutes: number,
    readonly usageDurationInDays: number
  ) {
    super(id, name, doseUnit, doseAmount, frequencyInMinutes, usageDurationInDays);
  }
}