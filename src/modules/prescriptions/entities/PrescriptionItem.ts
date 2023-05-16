import { MedicationPresentationDosage } from "../../medications/entities/MedicationPresentationDosage";

export class PrescriptionItem {
  constructor(
    readonly medicationPresentation: MedicationPresentationDosage,
    readonly doseAmount: number,
    readonly interval: number,
    readonly intervalUnit: string,
    readonly occurrences: number,
    readonly comments: string,
    readonly id?: number,
    readonly prescriptionId?: number,
  ) {}
}