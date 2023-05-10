import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const FooterContainer = styled(Box).attrs({
  sx: {
    display: 'flex',
    alignItems: 'center',
    miHeight: '10vh',
    padding: '20px',
    justifyContent: 'center',
    backgroundColor: '#f2f0f1',
    flexDirection: 'column',
    flexGrow: 1
  }
})``;

export const Text = styled(Typography).attrs({
  sx: {
    paddingBottom: '10px',
  }
})``;