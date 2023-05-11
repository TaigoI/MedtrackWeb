import { UIMedication } from "../entities/UIMedication";
import { ValidMedicationsMock } from "./valid-medications";

export const ValidUIMedicationsMock: UIMedication[] = ValidMedicationsMock.map(item => ({
  ...item,
  checked: false,
  usageDurationInDaysToShow: `${item.usageDurationInDays} dias`,
  frequencyInHours: ''
}));