import { InputAdornment, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { ContentContainer, AddMedicationButton, MedicationList, MedicationField } from './styles';
import { yupResolver } from '@hookform/resolvers/yup'

import { Medication } from '../../../modules/medications/entities/Medication';
import { CalendarToday, MedicalInformation, MedicationOutlined, Title, Update } from '@mui/icons-material';
import { v4 } from 'uuid';
import { Controller, useForm } from 'react-hook-form';
import { yupSchema } from './data';
import { IFormValues } from './props';
import { PrescriptionItem } from '../../../modules/prescriptions/entities/PrescriptionItem';

export interface IAddMedicationModalComponentProps {
  isOpen: boolean;
  handleClose: () => void;
  handleAdd: (medication: PrescriptionItem) => void;
}

export const AddMedicationModal: React.FC<IAddMedicationModalComponentProps> = ({
  handleAdd,
  handleClose,
  isOpen 
}) => {
  const { handleSubmit, control, reset, formState: {errors} } = useForm<IFormValues>({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      doseAmount: 0,
      doseUnit: '',
      frequencyInMinutes: 0,
      name: '', 
      usageDurationInDays: 0
    }
  });
  
  useEffect(() => console.log(errors), [errors])

  const handleInternalAdd = (data: IFormValues) => {
    console.log(data)
    // handleAdd({
    //   ...data,
    //   id: v4()
    // })
    handleClose();
    reset();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ContentContainer> 
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Adicionar medicamento
        </Typography>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <MedicationField 
              name='name'
              onChange={onChange}
              value={value} 
              error={!!errors.name?.message}
              helperText={errors.name?.message}
              label={'Nome'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Title />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        

        <Controller
          control={control}
          name="doseUnit"
          render={({ field: { onChange, onBlur, value, ref } }) => (
        <MedicationField 
          onChange={onChange}
          value={value}
          error={!!errors.doseUnit?.message}
          helperText={errors.doseUnit?.message}
          label={'Dosagem'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MedicalInformation />
              </InputAdornment>
            ),
          }}
        />)} />

        <Controller
          control={control}
          name="doseAmount"
          render={({ field: { onChange, onBlur, value, ref } }) => (
        <MedicationField 
          onChange={onChange}
          value={value} 
          error={!!errors.doseAmount?.message}
          helperText={errors.doseAmount?.message}
          label={'Dose'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MedicationOutlined />
              </InputAdornment>
            ),
          }}
        />)}/>

        <Controller
          control={control}
          name="frequencyInMinutes"
          render={({ field: { onChange, onBlur, value, ref } }) => (
        <MedicationField 
          onChange={onChange}
          value={value} 
          error={!!errors.frequencyInMinutes?.message}
          helperText={errors.frequencyInMinutes?.message}
          label={'A cada'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Update />
              </InputAdornment>
            ),
          }}
        />)}/>

        <Controller
          control={control}
          name="usageDurationInDays"
          render={({ field: { onChange, onBlur, value, ref } }) => (
        <MedicationField 
          onChange={onChange}
          value={value} 
          error={!!errors.usageDurationInDays?.message}
          helperText={errors.usageDurationInDays?.message}
          label={'Por'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarToday />
              </InputAdornment>
            ),
          }}
        />)}/>
        <AddMedicationButton onClick={handleSubmit(handleInternalAdd)}>Adicionar</AddMedicationButton>
      </ContentContainer>
    </Modal>
  );
};
