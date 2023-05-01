import { Modal, Typography, Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { ContentContainer, ImportMedicationButton, MedicationList } from './styles';

export interface IImportMedicationModalComponentProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const ImportMedicationModal: React.FC<IImportMedicationModalComponentProps> = ({
  handleClose,
  isOpen 
}) => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ContentContainer> 
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Importar medicamentos
        </Typography>
        <MedicationList>
          {[0, 1, 2, 3, 4, 5, 6].map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem
                key={value}
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </MedicationList>
        <ImportMedicationButton onClick={handleClose}>Importar</ImportMedicationButton>
      </ContentContainer>
    </Modal>
  );
};
