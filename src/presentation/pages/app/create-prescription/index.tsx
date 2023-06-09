import React, { useState } from 'react';

import Toolbar from '@mui/material/Toolbar';
import { DashboardContainerComponent } from '../../../components/dashboard-container';
import { Box, ListItem, ListSubheader, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Delete, Print } from '@mui/icons-material';
import { AddMedicationButton, ContentContainer, HorizontalRule, ImportMedicationButton, ListItemText, MainContainer, MedicationButtonsContainer, MedicationList, PrintFloatingButton, SaveAsTemplateContainer, SectionContainer, Title } from './styles';
import { ImportMedicationModal } from '../../../components/import-medication-modal';
import { intervalMapper, isMedicationKeyHidden, medicationKeyTranslator } from './data';
import { toast } from 'react-toastify';
import { AddMedicationModal } from '../../../components/add-medication-modal';
import { useNavigate } from 'react-router-dom';
import { useMedication } from '../../../context/MedicationContext';
import { Prescription } from '../../../../modules/prescriptions/entities/Prescription';
import { PrescriptionItem } from '../../../../modules/prescriptions/entities/PrescriptionItem';
import { v4 } from 'uuid';
import { useAuthentication } from '../../../context/AuthenticationContext';
import { AxiosHttpClient } from '../../../../infra/http/AxiosHttpClient';

export const CreatePrescriptionScreen: React.FC = () => {
  const [saveAsTemplate, setSaveAsTemplate] = useState<boolean>();
  const [isImportationOpen, setImportationOpen] = React.useState(false);
  const [isAdditionOpen, setAdditionOpen] = React.useState(false);

  const {
    prescriptions,
    patientName,
    prescriptionItems,
    setPrescriptionItems,
    setPrescriptions,
    setPatientName
  } = useMedication();

  const [patientNameError, setPatientNameError] = useState<string>();
  const [templateDescription, setTemplateDescription] = useState<string>('');

  const handleOpenImportation = () => setImportationOpen(true);
  const handleCloseImportation = () => setImportationOpen(false);
  const handleOpenAddition = () => setAdditionOpen(true);
  const handleCloseAddition = () => setAdditionOpen(false);

  const navigate = useNavigate();

  function handleError(errorMessage: string) {
    toast.error(errorMessage, {
      theme: 'colored'
    });
  }

  async function handleSuccess() {
    toast.success(`Receita criada com sucesso!`, {
      theme: 'colored'
    });
    navigate('/app/receita/pdf', {patientName, prescriptions} as unknown as never);
  }

  async function handlePrint() {
    if (!patientName) {
      setPatientNameError('Nome é obrigatório');
      return;
    } 
    setPatientNameError(undefined);
    if (prescriptionItems.length === 0) {
      handleError('Adicione algum medicamento!');
      return;
    }
    const prescriptionDTO = {
      title: `Receita de ${patientName}`,
      description: `-`,
      template: saveAsTemplate,
      templateTitle: templateDescription,
      templateDescription,
      items: prescriptionItems.map(item => ({
        medicationPresentationDosageId: item.medicationPresentation.id,
        doseAmount: item.doseAmount,
        interval: item.interval,
        intervalUnit: item.intervalUnit,
        occurrences: item.occurrences,
        comments: item.comments
      })) 
    }
    const response = await AxiosHttpClient.post(`/prescription`, prescriptionDTO)
    console.log(response.data);
    handleSuccess();
  }

  const handleImport = (_prescriptions: Prescription[]) => {
    const allItems = _prescriptions.reduce((previous: PrescriptionItem[], prescription) => [...previous, ...prescription.items], []);
    setPrescriptionItems(allItems);
  }

  const handleAddMedication = (prescriptionItem: PrescriptionItem) => {
    setPrescriptionItems(previous => [...previous, prescriptionItem]);
  }



  return (
    <DashboardContainerComponent appBar={{
      title: 'Nova Receita'
    }}>
      <ImportMedicationModal 
        isOpen={isImportationOpen} 
        handleClose={handleCloseImportation} 
        handleImport={handleImport}
      />
      <AddMedicationModal 
        isOpen={isAdditionOpen} 
        handleAdd={handleAddMedication}
        handleClose={handleCloseAddition}
      />
      <Toolbar />
      <MainContainer>
        <PrintFloatingButton onClick={handlePrint}>
          <Print />
        </PrintFloatingButton>
        <ContentContainer>
          <Box>
            <Title>Dados do Paciente</Title>
            <HorizontalRule />
            <TextField 
              label={patientNameError || 'Nome'}
              value={patientName} 
              onChange={e => setPatientName(e.target.value)} 
              error={!!patientNameError}  
            />
          </Box>
          <SectionContainer>
            <Title>Medicamentos</Title>
            <HorizontalRule/>
            <MedicationList>
              {prescriptionItems.length > 0 ? prescriptionItems.map((prescriptionItem, index) => (
                <li key={`section-${index}`}>
                  <ul>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <ListSubheader>
                        {`${index + 1}. ${prescriptionItem.medicationPresentation.medication.name}`}
                      </ListSubheader>
                      <Delete 
                        onClick={() => {
                          setPrescriptionItems(previous => previous.filter((item, pIndex)=> index !== pIndex))
                        }} 
                        sx={{
                          cursor: 'pointer'
                        }}
                      />
                    </Box>
                    <ListItem>
                      <ListItemText>
                        <b>Dosagem</b>: {prescriptionItem.medicationPresentation.dosage.amount}{prescriptionItem.medicationPresentation.dosage.unit}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <b>Tipo</b>: {prescriptionItem.medicationPresentation.presentation.name}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <b>Dose</b>: {prescriptionItem.doseAmount}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <b>A cada</b>: {prescriptionItem.interval}{intervalMapper[prescriptionItem.intervalUnit]}
                      </ListItemText>
                    </ListItem>
                  </ul>
                </li>
              )) :  <p>Importe ou adicione medicamentos</p>}
            </MedicationList>
            <MedicationButtonsContainer>
              <ImportMedicationButton onClick={handleOpenImportation}>Importar</ImportMedicationButton>
              <AddMedicationButton onClick={handleOpenAddition}>Adicionar</AddMedicationButton>
            </MedicationButtonsContainer>
          </SectionContainer>
          <SectionContainer>
            <Title>Modelo</Title>
            <HorizontalRule />
            <SaveAsTemplateContainer>
              <p>Salvar como Modelo</p>
              <Switch defaultChecked={false} value={saveAsTemplate} onChange={e => setSaveAsTemplate(e.target.checked)} />
            </SaveAsTemplateContainer>
            <TextField label='Descrição do modelo' disabled={!saveAsTemplate} value={templateDescription} onChange={e=> setTemplateDescription(e.target.value)}/>
          </SectionContainer>
        </ContentContainer>
      </MainContainer> 
    </DashboardContainerComponent>
  );
};
