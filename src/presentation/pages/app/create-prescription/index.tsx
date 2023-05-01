import React, { useState } from 'react';

import Toolbar from '@mui/material/Toolbar';
import { DashboardContainerComponent } from '../../../components/dashboard-container';
import { Box, ListItem, ListItemText, ListSubheader, Modal, Switch, TextField, Typography } from '@mui/material';
import { Print } from '@mui/icons-material';
import { AddMedicationButton, ContentContainer, HorizontalRule, ImportMedicationButton, MainContainer, MedicationButtonsContainer, MedicationList, PrintFloatingButton, SaveAsTemplateContainer, SectionContainer, Title } from './styles';
import { ImportMedicationModal } from '../../../components/import-medication-modal';

export const CreatePrescriptionScreen: React.FC = () => {
  const [saveAsTemplate, setSaveAsTemplate] = useState<boolean>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <DashboardContainerComponent appBar={{
      title: 'Nova Receita'
    }}>
      <ImportMedicationModal isOpen={open} handleClose={handleClose} />
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
              {[0, 1, 2, 3, 4].map((sectionId) => (
                <li key={`section-${sectionId}`}>
                  <ul>
                    <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                    {[0, 1, 2].map((item) => (
                      <ListItem key={`item-${sectionId}-${item}`}>
                        <ListItemText primary={`Item ${item}`} />
                      </ListItem>
                    ))}
                  </ul>
                </li>
              ))}
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
