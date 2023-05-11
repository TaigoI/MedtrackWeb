import { Medication } from "./Medication";

export class UIMedication extends Medication {
  public usageDurationInDaysToShow: string;
  public frequencyInHours: string;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly doseUnit: string,
    readonly doseAmount: number,
    readonly frequencyInMinutes: number,
    readonly usageDurationInDays: number,
    public checked?: boolean,
  ) {
    super(id, name, doseUnit, doseAmount, frequencyInMinutes, usageDurationInDays);
    this.usageDurationInDaysToShow = `${usageDurationInDays} dia${usageDurationInDays > 1 ? 's' : ''}`;
    this.frequencyInHours = `${Math.floor(frequencyInMinutes / 60)}h`;
  }
}