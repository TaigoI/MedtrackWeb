const medicationKeysToShow = [
  'doseAmount',
  'doseUnit',
  'frequencyInMinutes',
  'usageDurationInDays'
];

export const isMedicationKeyHidden = (key: string) => !medicationKeysToShow.includes(key);

export const medicationKeyTranslator = (key: string): string => {
  const keys: {[key: string]: string}= {
    doseAmount: 'Dose',
    doseUnit: 'Dosagem',
    frequencyInMinutes: 'A cada',
    usageDurationInDays: 'Por'
  };
  return keys[key];
};