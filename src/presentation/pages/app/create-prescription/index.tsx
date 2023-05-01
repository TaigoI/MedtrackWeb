import React, { useState } from 'react';

import Toolbar from '@mui/material/Toolbar';
import { DashboardContainerComponent } from '../../../components/dashboard-container';
import { Box, Button, List, ListItem, ListItemText, ListSubheader, Switch, TextField } from '@mui/material';

export const CreatePrescriptionScreen: React.FC = () => {
  const [saveAsTemplate, setSaveAsTemplate] = useState<boolean>();

  return (
    <DashboardContainerComponent appBar={{
      title: 'Nova Receita'
    }}>
      <Toolbar />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box sx={{width: '70%'}}>
          <Box sx={{backgroundColor: ''}}>
            <h2>Dados do Paciente</h2>
            <hr style={{marginBottom: '1.6rem'}} />
            <TextField label='Nome' />
          </Box>
          <Box sx={{backgroundColor: ''}}>
            <h2>Medicamentos</h2>
            <hr style={{marginBottom: '1.6rem'}}/>
            <Box sx={{width: '100%', backgroundColor: ''}}>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
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
              </List>
              <Box sx={{marginTop: '1.6rem'}}>
                <Button variant='contained'>Importar</Button>
                <Button variant='outlined'>Adicionar</Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <h2>Modelo</h2>
            <hr style={{marginBottom: '1.6rem'}} />
            <Box sx={{display: 'flex', alignItems: 'center', marginBottom: '1.2rem'}}>
              <p>Salvar como Modelo</p>
              <Switch defaultChecked={false} value={saveAsTemplate} onChange={e => setSaveAsTemplate(e.target.checked)} />
            </Box>
            <TextField label='Descrição do modelo' disabled={!saveAsTemplate} />
          </Box>
        </Box>
      </Box> 
    </DashboardContainerComponent>
  );
};
