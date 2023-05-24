import React from 'react';

import Toolbar from '@mui/material/Toolbar';
import { Typography, Divider } from '@mui/material';
import { DashboardContainerComponent } from '../../../components/dashboard-container';
import { generatedAvatarUrlFactory } from '../../../../shared/utils/generated-avatar-url-factory';
import { useAuthentication } from '../../../context/AuthenticationContext';

export const HomeScreen: React.FC = () => {
  const { user }= useAuthentication()

  return !user ?<p>Carregando...</p> :(
    <DashboardContainerComponent 
      appBar={{
        title: `Olá, ${user.name}!`, 
        image: generatedAvatarUrlFactory(user.name) 
      }}
    >
      <Toolbar />

      <div 
        style={{
          height: '90%', 
          width: '100%', 
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center'
        }}>
          <Typography sx={{textAlign: 'justify'}}>
            <Typography variant="h4" gutterBottom>
              Bem-vind@ ao Medtrack!
              <Divider />
            </Typography>
            <br />
            
            <Typography variant='h6' gutterBottom>
              🩺 Hora do atendimento?
              <Divider />
            </Typography>
            <Typography component='p' variant="body1" gutterBottom>
              Clique em <strong>Prescrever Receita</strong> para começar a prescrever. Lá, você poderá adicionar os medicamentos que integram a sua receita.
            </Typography>
            <br />

            <Typography variant='h6' gutterBottom>
              🧠 Nós lembramos o nome pra você!
              <Divider />
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ao clicar em <strong>adicionar</strong>, especifique o remédio com a posologia adequada. Temos uma grande base de remédios disponível e sugeriremos o nome!
            </Typography>
            <br />
            
            <Typography variant='h6' gutterBottom>
              ⚡ Prescrição ágil!
              <Divider />
            </Typography>
            <Typography variant="body1" gutterBottom>
              Notou que a receita é prescrita com muita frequência? Clique em <strong>Salvar como modelo</strong> para recuperá-la sempre que precisar!
            </Typography>
            <br />
            
            <Typography variant='h6' gutterBottom>
              🖨️ Direto para o paciente!
              <Divider />
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ao terminar, clique na impressora para exportar a receita em PDF. Lá haverá um QRCode, por meio do qual o paciente pode importar os medicamentos no App móvel Medtrack.
            </Typography>

          </Typography>
      </div>
    
    </DashboardContainerComponent>
  ) ;
};
