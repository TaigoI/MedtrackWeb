import React from 'react';
import { Grid, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles, LargeImg, LargeImgMobile } from './styles'
import ImgConsulta from '../../../../assets/images/consulta.jpeg';

export const Hero = () => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={styles.heroBox}>
      <Grid container spacing={6} sx={styles.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} sx={styles.title}>
              Consultas mais eficientes e remédios na hora certa
          </Typography>
          <Typography variant="h6" sx={styles.subtitle}>
              Com o Medtrack, médicos podem prescrever receitas com mais agilidade por meio
              do nosso sistema de receitas favoritas: a escolha dos remédios e a impressão
              está a poucos cliques de distância! 
          </Typography>
          <Button
              variant="contained"
              color="primary"
              sx={{ width: '200px', fontSize: '16px' }}
          >
              COMECE IMEDIATAMENTE
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          {
            matches ? <LargeImgMobile src={ImgConsulta} alt='Consulta médica' /> :
            <LargeImg src={ImgConsulta} alt="Consulta médica"/>
          }
        </Grid>
      </Grid>
    </Box>
  );
};
