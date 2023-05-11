import React from 'react';
import { Typography } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import { SectionGridContainer, SectionGridItem, SectionBox } from './styles';
import { SvgIconComponent } from '@mui/icons-material';
import styled from 'styled-components';

export const Section = () => {

  const sectionItems = [
    {
      id: 1,
      icon: <BoltIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        'Plataforma moderna e rápida para criação e emissão de receitas, focada em otimizar o tempo do médico'
    },
    {
      id: 2,
      icon: <MedicationLiquidIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        'Receitas favoritas que você pode guardar e reaproveitar quando quiser',
    },
    {
      id: 3,
      icon: <MobileFriendlyIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence: 'Integração com aplicativo para o paciente via QRCode para garantir que a receita será seguida',
    },
  ];
  return (
    <SectionBox>
      <SectionGridContainer>
        {sectionItems.map((item) => (
          <SectionGridItem
            xs={12}
            md={3.5}
            minHeight={300}
            key={item.id}
          >
            {item.icon}
            <Typography variant='h6' >{item.sentence}</Typography>
          </SectionGridItem>
        ))}
      </SectionGridContainer>
    </SectionBox>
  );
};
