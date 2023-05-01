import { InputAdornment, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { ContentContainer, AddMedicationButton, MedicationList, MedicationField } from './styles';
import { Medication } from '../../../modules/medications/entities/Medication';
import { ValidMedicationsMock } from '../../../modules/medications/mocks/valid-medications';
import { CalendarToday, MedicalInformation, MedicationOutlined, Title, Update } from '@mui/icons-material';
import { v4 } from 'uuid';
import { Controller, useForm } from 'react-hook-form';

export interface IAddMedicationModalComponentProps {
  isOpen: boolean;
  handleClose: () => void;
  handleAdd: (medication: Medication) => void;
}

export const AddMedicationModal: React.FC<IAddMedicationModalComponentProps> = ({
  handleAdd,
  handleClose,
  isOpen 
}) => {
  const { handleSubmit, control } = useForm();
  const handleInternalAdd = () => {
    handleAdd({
      ...ValidMedicationsMock[0],
      id: v4()
    })
    handleClose();
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
              label={'Nome'}
              value={value}
              onChange={onChange}
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
          label={'Por'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarToday />
              </InputAdornment>
            ),
          }}
        />)}/>
        <AddMedicationButton onClick={handleInternalAdd}>Adicionar</AddMedicationButton>
      </ContentContainer>
    </Modal>
  );
};
