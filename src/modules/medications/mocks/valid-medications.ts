import { Medication } from "../entities/Medication";
import { v4 } from 'uuid'

export const ValidMedicationsMock: Medication[] = [
  {
    doseAmount: 1,
    doseUnit: '500mg',
    frequencyInMinutes: 480,
    id: v4(),
    name: 'Parecetamol',
    usageDurationInDays: 1
  },
  {
    doseAmount: 1,
    doseUnit: '1g',
    frequencyInMinutes: 480,
    id: v4(),
    name: 'Dipirona',
    usageDurationInDays: 2
  }
];