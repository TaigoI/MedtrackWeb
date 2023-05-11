import React from 'react';
import {
  Grid,
  Button,
  useMediaQuery,
  Link
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  LargeImg,
  HeroBox,
  GridContainer,
  Title,
  Subtitle
} from './styles'
import ImgConsulta from '../../../../assets/images/consulta.png';

export const Hero = () => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <HeroBox>
      <GridContainer spacing={6}>
        <Grid item xs={12} md={7}>
          <Title fontWeight={700}>
            Consultas mais eficientes e remédios na hora certa
          </Title>
          <Subtitle>
            Com o Medtrack, médicos podem prescrever receitas com mais agilidade por meio
            do nosso sistema de receitas favoritas: a escolha dos remédios e a impressão
            está a poucos cliques de distância!
          </Subtitle>
          <Link href='/app' target='_blank' color='#FFF' underline='none'>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '200px', fontSize: '16px' }}
            >
              COMECE
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={5}>
          <LargeImg src={ImgConsulta} alt="Consulta médica" />
        </Grid>
      </GridContainer>
    </HeroBox>
  );
};
