import React, { useState } from 'react';

import Toolbar from '@mui/material/Toolbar';
import { DashboardContainerComponent } from '../../../components/dashboard-container';
import { Box, ListItem, ListSubheader, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Delete, Print } from '@mui/icons-material';
import { AddMedicationButton, ContentContainer, HorizontalRule, ImportMedicationButton, ListItemText, MainContainer, MedicationButtonsContainer, MedicationList, PrintFloatingButton, SaveAsTemplateContainer, SectionContainer, Title } from './styles';
import { ImportMedicationModal } from '../../../components/import-medication-modal';
import { isMedicationKeyHidden, medicationKeyTranslator } from './data';
import { toast } from 'react-toastify';
import { AddMedicationModal } from '../../../components/add-medication-modal';
import { useNavigate } from 'react-router-dom';
import { useMedication } from '../../../context/MedicationContext';
import { Prescription } from '../../../../modules/prescriptions/entities/Prescription';
import { PrescriptionItem } from '../../../../modules/prescriptions/entities/PrescriptionItem';

export const CreatePrescriptionScreen: React.FC = () => {
  const [saveAsTemplate, setSaveAsTemplate] = useState<boolean>();
  const [isImportationOpen, setImportationOpen] = React.useState(false);
  const [isAdditionOpen, setAdditionOpen] = React.useState(false);
  const {
    prescriptions,
    patientName,
    setPrescriptions,
    setPatientName
  } = useMedication();

  const [patientNameError, setPatientNameError] = useState<string>();

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

  function handlePrint() {
    if (!patientName) {
      setPatientNameError('Nome é obrigatório');
      return;
    } 
    setPatientNameError(undefined);
    if (prescriptions.length === 0) {
      handleError('Adicione algum medicamento!');
      return;
    }
    handleSuccess();
  }

  const handleImport = (_prescriptions: Prescription[]) => {
    // setMedications([
    //   ...prescriptions,
    //   ...(_Prescriptions.map(medication => new UIMedication(medication.id, medication.name, medication.doseUnit, medication.doseAmount, medication.frequencyInMinutes, medication.usageDurationInDays)))
    // ]);
  }

  const handleAddMedication = (medication: PrescriptionItem) => {
    // ValidMedicationsMock.push(medication)
    // setMedications([
    //   ...prescriptions,
    //   new UIMedication(medication.id, medication.name, medication.doseUnit, medication.doseAmount, medication.frequencyInMinutes, medication.usageDurationInDays)
    // ]);
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
              {prescriptions.length > 0 ? prescriptions.map((medication, index) => (
                <li key={`section-${medication.id}`}>
                  {/* <ul>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <ListSubheader>
                        {`${index + 1}. ${medication.name}`}
                      </ListSubheader>
                      <Delete 
                        onClick={() => {
                          setPrescriptions(prescriptions.filter(item => item.id !== medication.id))
                        }} 
                        sx={{
                          cursor: 'pointer'
                        }}
                      />
                    </Box>
                    {Object.keys(medication).map((key) => {
                      if (isMedicationKeyHidden(key)) return <></>;
                      return <ListItem key={`item-${medication}-${key}`}>
                        <ListItemText>
                          <b>{medicationKeyTranslator(key)}</b>: {medication[key as keyof Prescription]}
                        </ListItemText>
                      </ListItem>
                    })}
                    
                  </ul> */}
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
            <TextField label='Descrição do modelo' disabled={!saveAsTemplate} />
          </SectionContainer>
        </ContentContainer>
      </MainContainer> 
    </DashboardContainerComponent>
  );
};
