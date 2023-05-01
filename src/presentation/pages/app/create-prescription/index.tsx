import React, { useState } from 'react';

import Toolbar from '@mui/material/Toolbar';
import { DashboardContainerComponent } from '../../../components/dashboard-container';
import { Box, ListItem, ListSubheader, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Delete, Print } from '@mui/icons-material';
import { AddMedicationButton, ContentContainer, HorizontalRule, ImportMedicationButton, ListItemText, MainContainer, MedicationButtonsContainer, MedicationList, PrintFloatingButton, SaveAsTemplateContainer, SectionContainer, Title } from './styles';
import { ImportMedicationModal } from '../../../components/import-medication-modal';
import { Medication } from '../../../../modules/medications/entities/Medication';
import { isMedicationKeyHidden, medicationKeyTranslator } from './data';

export const CreatePrescriptionScreen: React.FC = () => {
  const [saveAsTemplate, setSaveAsTemplate] = useState<boolean>();
  const [open, setOpen] = React.useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImport = (_medications: Medication[]) => {
    setMedications([
      ...medications,
      ..._medications
    ]);
  }


  return (
    <DashboardContainerComponent appBar={{
      title: 'Nova Receita'
    }}>
      <ImportMedicationModal 
        isOpen={open} 
        handleClose={handleClose} 
        handleImport={handleImport}
      />
      <Toolbar />
      <MainContainer>
        <PrintFloatingButton>
          <Print />
        </PrintFloatingButton>
        <ContentContainer>
          <Box>
            <Title>Dados do Paciente</Title>
            <HorizontalRule />
            <TextField label='Nome' />
          </Box>
          <SectionContainer>
            <Title>Medicamentos</Title>
            <HorizontalRule/>
            <MedicationList>
              {medications.length > 0 ? medications.map((medication, index) => (
                <li key={`section-${medication.id}`}>
                  <ul>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <ListSubheader>
                        {`${index + 1}. ${medication.name}`}
                      </ListSubheader>
                      <Delete 
                        onClick={() => {
                          setMedications(medications.filter(item => item.id !== medication.id))
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
                          <b>{medicationKeyTranslator(key)}</b>: {medication[key as keyof Medication]}
                        </ListItemText>
                      </ListItem>
                    })}
                    
                  </ul>
                </li>
              )) :  <p>Importe ou adicione medicamentos</p>}
            </MedicationList>
            <MedicationButtonsContainer>
              <ImportMedicationButton onClick={handleOpen}>Importar</ImportMedicationButton>
              <AddMedicationButton>Adicionar</AddMedicationButton>
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
