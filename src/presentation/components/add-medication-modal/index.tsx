import { Autocomplete, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ContentContainer, AddMedicationButton, MedicationList, MedicationField } from './styles';
import { yupResolver } from '@hookform/resolvers/yup'

import { Medication } from '../../../modules/medications/entities/Medication';
import { CalendarToday, MedicalInformation, MedicationOutlined, Title, Update } from '@mui/icons-material';
import { v4 } from 'uuid';
import { Controller, useForm } from 'react-hook-form';
import { yupSchema } from './data';
import { IFormValues } from './props';
import { PrescriptionItem } from '../../../modules/prescriptions/entities/PrescriptionItem';
import { AxiosHttpClient } from '../../../infra/http/AxiosHttpClient';
import { Dosage } from '../../../modules/medications/entities/Dosage';
import { Presentation } from '../../../modules/medications/entities/Presentation';

export interface IAddMedicationModalComponentProps {
  isOpen: boolean;
  handleClose: () => void;
  handleAdd: (medication: PrescriptionItem) => void;
}

interface UIMedication extends Omit<Medication, 'id'> {
  id: string;
  label: string;
}

interface UIDosage extends Omit<Dosage, 'id'> {
  id: string;
  label: string;
}

interface UIPresentation extends Omit<Presentation, 'id'> {
  id: string;
  label: string;
}

export const AddMedicationModal: React.FC<IAddMedicationModalComponentProps> = ({
  handleAdd,
  handleClose,
  isOpen 
}) => {
  const { handleSubmit, control, setValue, reset, formState: {errors} } = useForm<IFormValues>({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      doseAmount: 0,
      doseUnit: '',
      frequencyInHours: 0,
      name: '', 
      usageDurationInDays: 0
    }
  });
  const [selectedMedication, setSelectedMedication] = useState<Medication>();
  const [selectedDosage, setSelectedDosage] = useState<Dosage>();
  const [selectedPresentation, setSelectedPresentation] = useState<Presentation>();
  const [medicationOptions, setMedicationOptions] = useState<UIMedication[]>([]);
  const [dosageOptions, setDosageOptions] = useState<UIDosage[]>([]);
  const [presentationOptions, setPresentationOptions] = useState<UIPresentation[]>([]);
  
  useEffect(() => console.log(errors), [errors])

  const handleInternalAdd = (data: IFormValues) => {
    if (!selectedDosage || !selectedMedication || !selectedPresentation) return;
    console.log(data)
    handleAdd({
      ...data,
      comments: '-',
      interval: data.frequencyInHours,
      intervalUnit: 'minute',
      medicationPresentation: {
        id: 1,
        dosage: selectedDosage,
        medication: selectedMedication,
        presentation: selectedPresentation,
      },
      occurrences: data.frequencyInHours * data.doseAmount,
      doseAmount: data.doseAmount,
    })
    handleClose();
    reset();
  };

  async function handleSearchMedication(medication: string) {
    const response = await AxiosHttpClient.get(`/medication?medication=${medication}`);
    setMedicationOptions(response.data.content.map((item: Medication)=> ({...item, id: item.id, label: item.name})));
  }
  async function handleSearchDosage(medication: string) {
    const response = await AxiosHttpClient.get(`/dosage?medication=${medication}`);
    setDosageOptions(response.data.content.map((item: Dosage)=> ({...item, id: item.id, label: `${item.amount} ${item.unit}`})));
  }
  async function handleSearchPresentation(medication: string) {
    const response = await AxiosHttpClient.get(`/presentation?medication=${medication}`);
    setPresentationOptions(response.data.content.map((item: Presentation)=> ({...item, id: item.id, label: item.name})));
  }

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
            <Autocomplete 
            options={medicationOptions}
            disablePortal
            onChange={(event, value)=> {
              if (value) {
                setValue('name', value.id)
                handleSearchDosage(value.label);
                handleSearchPresentation(value.label);
                setSelectedMedication(value);
              }
            }}
            renderInput={(params) => <MedicationField
              name='name'
              {...params}
              onChange={async data => {
                handleSearchMedication(data.target.value)
                onChange(data);
              }}
              value={value} 
              error={!!errors.name?.message}
              helperText={errors.name?.message}
              label={'Nome'}
            />}
            />
            
          )}
        />
        

        <Controller
          control={control}
          name="doseUnit"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Autocomplete 
            options={dosageOptions}
            disablePortal
            onChange={(_, value) => {
              if (value?.id) {
                setValue('doseUnit', value.id)
                setSelectedDosage({...value, id: Number(value.id)});
              }
            }}
            renderInput={params => (
              <MedicationField 
                {...params}
                name='doseUnit'
                onChange={onChange}
                value={value}
                error={!!errors.doseUnit?.message}
                helperText={errors.doseUnit?.message}
                label={'Dosagem'}
              />
            )} />
        )} />

        <Controller
          control={control}
          name="presentation"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Autocomplete 
            options={presentationOptions}
            disablePortal
            onChange={(_, value) => {
              if (value?.id) {
                setValue('presentation', value.id)
                setSelectedPresentation({...value, id: Number(value.id)});
              }
            }}
            renderInput={params => (
              <MedicationField 
                {...params}
                name='presentation'
                onChange={onChange}
                value={value}
                error={!!errors.doseUnit?.message}
                helperText={errors.doseUnit?.message}
                label={'Tipo'}
              />
            )} />
        )} />

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
          name="frequencyInHours"
          render={({ field: { onChange, onBlur, value, ref } }) => (
        <MedicationField 
          onChange={onChange}
          value={value} 
          error={!!errors.frequencyInHours?.message}
          helperText={errors.frequencyInHours?.message}
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
          helperText={errors.usageDurationInDays?.message || 'Valor em dias'}
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
