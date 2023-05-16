import React from 'react';

import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/material';
import { DashboardContainerComponent } from '../../../components/dashboard-container';
import { generatedAvatarUrlFactory } from '../../../../shared/utils/generated-avatar-url-factory';
import { BarChart } from '../../../components/bar-chart';

export const HomeScreen: React.FC = () => {
  const profile = {
    doctor: {
      name: 'Leonard McCoy'
    }
  };

  return (
    <DashboardContainerComponent 
      appBar={{
        title: `Olá, ${profile.doctor.name}!`, 
        image: generatedAvatarUrlFactory(profile.doctor.name) 
      }}
    >
      <Toolbar />

      <Box sx={{height: '90%', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <BarChart />
      </Box>
    
    </DashboardContainerComponent>
  );
};
