import { Box, Button, Fab, List } from '@mui/material';
import styled from 'styled-components';

export const MainContainer = styled(Box)`
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled(Box)`
  width: 70%;
`;

export const PrintFloatingButton = styled(Fab).attrs({
  color: 'primary',
  sx: {
    position: 'fixed', 
    right: '0', 
    bottom: '0', 
    margin: '2.4rem'
  }
})``;

export const Title = styled.h2`
  margin-bottom: 0;
`;

export const HorizontalRule = styled.hr`
  margin-bottom: 1.6rem; 
  border: 1px solid #ddd;
`;

export const MedicationList = styled(List).attrs({
  sx: {
    width: '100%',
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    '& ul': { padding: 0 },
  },
  subheader: <li />
})``

export const MedicationButtonsContainer = styled(Box)`
  margin-top: 1.6rem;
`

export const ImportMedicationButton = styled(Button).attrs({
  variant: 'contained'
})``;

export const AddMedicationButton = styled(Button).attrs({
  variant: 'outlined',
  sx: {
    marginLeft: '0.5rem'
  }
})``;

export const SectionContainer = styled(Box)`
  margin-top: 2.4rem;
`;

export const SaveAsTemplateContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;