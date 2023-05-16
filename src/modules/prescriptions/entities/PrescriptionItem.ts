import { MedicationPresentationDosage } from "../../medications/entities/MedicationPresentationDosage";
import { Prescription } from "./Prescription";

export class PrescriptionItem {
  constructor(
    readonly id: number,
    readonly prescription: Prescription,
    readonly medicationPresentationDosage: MedicationPresentationDosage,
    readonly doseAmount: number,
    readonly interval: number,
    readonly intervalUnit: number,
    readonly occurrences: number,
    readonly comments: string,
  ) {}
}