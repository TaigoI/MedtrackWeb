import { Box, Typography, Link } from '@mui/material';
import { styles } from './styles';

export const Footer = () => {
  return (
    <Box sx={styles.footerContainer}>
      <Typography sx={styles.footerText}>
        Feito por {' '}
        <Link href="https://github.com/TaigoI/MedtrackWeb" target="_blank" underline="none">
          PDS - Grupo 3
        </Link>
      </Typography>
      <Typography sx={styles.footerDate}>Buit with MUI</Typography>
    </Box>
  );
};
