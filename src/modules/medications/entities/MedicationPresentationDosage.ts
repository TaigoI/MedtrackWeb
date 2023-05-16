import { Dosage } from "./Dosage";
import { Medication } from "./Medication";
import { Presentation } from "./Presentation";

export class MedicationPresentationDosage {
  constructor(
    readonly id: number,
    readonly medication: Medication,
    readonly presentation: Presentation,
    readonly dosage: Dosage,
    readonly dosageAmount: string,
    readonly dosageUnit: string,
  ) {}
}