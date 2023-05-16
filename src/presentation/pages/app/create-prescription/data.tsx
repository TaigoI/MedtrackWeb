const medicationKeysToShow = [
  'doseAmount',
  'doseUnit',
  'interval',
];

export const isMedicationKeyHidden = (key: string) => !medicationKeysToShow.includes(key);

export const medicationKeyTranslator = (key: string): string => {
  const keys: {[key: string]: string}= {
    doseAmount: 'Dose',
    doseUnit: 'Dosagem',
    interval: 'A cada',
  };
  return keys[key];
};

export const intervalMapper: {[key: string]: string}= {
  minute: 'min',
  minutes: 'min',
  hour: 'h',
  hours: 'h'
}