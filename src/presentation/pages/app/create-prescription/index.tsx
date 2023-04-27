import React from 'react';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DashboardContainerComponent } from '../../../components/dashboard-container';
import { Input } from '@mui/material';

export const CreatePrescriptionScreen: React.FC = () => {
  return (
    <DashboardContainerComponent appBar={{
      title: 'Nova Receita'
    }}>
      <Toolbar />
      <Input placeholder='Nome do Paciente' />
    </DashboardContainerComponent>
  );
};
