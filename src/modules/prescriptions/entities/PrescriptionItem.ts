import { MedicationPresentationDosage } from "../../medications/entities/MedicationPresentationDosage";

export class PrescriptionItem {
  constructor(
    readonly id: number,
    readonly prescriptionId: number,
    readonly medicationPresentation: MedicationPresentationDosage,
    readonly doseAmount: number,
    readonly interval: number,
    readonly intervalUnit: string,
    readonly occurrences: number,
    readonly comments: string,
  ) {}
}