import React from 'react';

import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/material';
import { DashboardContainerComponent } from '../../../components/dashboard-container';
import { generatedAvatarUrlFactory } from '../../../../shared/utils/generated-avatar-url-factory';
import { BarChart } from '../../../components/bar-chart';
import { useAuthentication } from '../../../context/AuthenticationContext';
import { useNavigate } from 'react-router-dom';


export const HomeScreen: React.FC = () => {
  const { user }= useAuthentication()
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return <></>;
  };

  return (
    <DashboardContainerComponent 
      appBar={{
        title: `Olá, ${user.name}!`, 
        image: generatedAvatarUrlFactory(user.name) 
      }}
    >
      <Toolbar />

      <Box sx={{height: '90%', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <BarChart />
      </Box>
    
    </DashboardContainerComponent>
  );
};
