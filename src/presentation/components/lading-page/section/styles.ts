import { Box, Grid } from '@mui/material';
import styled from 'styled-components';

export const SectionBox = styled(Box).attrs({
  sx: {
    flexGrow: 1, 
    minHeight: '400px'
  }
})``;

export const SectionGridContainer = styled(Grid).attrs({
  container: true,
  sx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '500px',
  }
})``;

export const SectionGridItem = styled(Grid).attrs({
  item: true,
  sx: {
    backgroundColor: '#f2f0f1',
    textAlign: 'center',
    padding: '30px',
    width: '200px',
    borderRadius: '10px',
    margin: '10px !important',
  }
})``;