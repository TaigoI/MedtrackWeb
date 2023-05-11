const medicationKeysToShow = [
  'doseAmount',
  'doseUnit',
  'frequencyInHours',
  'usageDurationInDaysToShow'
];

export const isMedicationKeyHidden = (key: string) => !medicationKeysToShow.includes(key);

export const medicationKeyTranslator = (key: string): string => {
  const keys: {[key: string]: string}= {
    doseAmount: 'Dose',
    doseUnit: 'Dosagem',
    frequencyInHours: 'A cada',
    usageDurationInDaysToShow: 'Por'
  };
  return keys[key];
};