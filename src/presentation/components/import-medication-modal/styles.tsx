import { Box, Button, List } from "@mui/material";
import styled from "styled-components";

export const ContentContainer = styled(Box).attrs({
  sx: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,

    p: 4,
  }
})`
`

export const MedicationList = styled(List).attrs({
  sx:{ 
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    overflow: 'auto',
    maxHeight: 300,
    '& ul': { padding: 0 },
  }
})``;

export const ImportMedicationButton = styled(Button).attrs({
  variant: 'contained',
  sx: {
    marginTop: '1.6rem'
  }
})``;