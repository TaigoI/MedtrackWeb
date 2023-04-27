import React from 'react';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DashboardContainerComponent } from '../../../components/dashboard-container';
import { generatedAvatarUrlFactory } from '../../../../shared/utils/generated-avatar-url-factory';


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
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
        Odio morbi quis commodo odio aenean sed adipiscing. 
      </Typography>
    </DashboardContainerComponent>
  );
};
