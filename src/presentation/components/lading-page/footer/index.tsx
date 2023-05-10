import { Typography, Link } from '@mui/material';
import { FooterContainer, Text } from './styles';

export const Footer = () => {
  return (
    <FooterContainer >
      <Text>
        Feito por {' '}
        <Link href="https://github.com/TaigoI/MedtrackWeb" target="_blank" underline="none">
          PDS - Grupo 3
        </Link>
      </Text>
      <Typography sx={{opacity: '0.4'}}>2023 - Buit with MUI</Typography>
    </FooterContainer>
  );
};
