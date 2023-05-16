import * as Yup from 'yup';

export const yupSchema = Yup.object().shape({
  name: Yup.string().required('Informe o nome do medicamento'),
  doseUnit: Yup.string().required('Informe a dosagem'),
  doseAmount: Yup.number().required('Informe a dose'),
  frequencyInHours: Yup.number().required('Informe a frequência que o paciente irá tomar'),
  usageDurationInDays: Yup.number().required('Informe a duração do tratamento'),
  presentation: Yup.number().required('Informe o tipo do medicamento'),
})