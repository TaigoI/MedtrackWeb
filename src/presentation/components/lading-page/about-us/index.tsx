import { Grid, Typography, Button, Box, Link } from '@mui/material';
import {  
  LargeImg,
  AboutUsContainer,
  GridContainer,
  Title,
  Subtitle,
} from './styles';
import FrameApp from '../../../../assets/images/frame-app.png';

export const AboutUs = () => {
  return (
    <AboutUsContainer >
      <GridContainer spacing={6} >
        <Grid item xs={12} md={5}>
          <LargeImg src={FrameApp} alt="Medtrack App" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Title variant="h3" fontWeight={700}>
            Sua receita será seguida
          </Title>
          <Subtitle >
            O seu trabalho continua com o paciente. Mas e se ele não conseguir
            continuar o tratamento sozinho? Pensando nisso, oferecemos o aplicativo
            móvel Medtrack, voltado para pacientes. O aplicativo integra as receitas
            emitidas por meio desta plataforma e garante que os medicamentos
            serão tomados devidamente através de um serviço de alarmes.
          </Subtitle>
          <Link underline='none' color='#FFF' target='_blank' href='https://github.com/TaigoI/MedtrackApp'>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '200px', fontSize: '16px' }}
            >
              MedtrackApp
            </Button>
          </Link>
        </Grid>
      </GridContainer>
    </AboutUsContainer>
  );
};
