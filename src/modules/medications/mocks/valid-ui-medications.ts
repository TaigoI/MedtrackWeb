import { ValidMedicationsMock } from "./valid-medications";

export const ValidUIMedicationsMock: any[] = ValidMedicationsMock.map(item => ({
  ...item,
  checked: false,
  usageDurationInDaysToShow: `2 dias`,
  frequencyInHours: ''
}));