import { Modal, Typography, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { ContentContainer, ImportMedicationButton, MedicationList } from './styles';
import { Medication } from '../../../modules/medications/entities/Medication';
import { UIMedication } from '../../../modules/medications/entities/UIMedication';
import { ValidUIMedicationsMock } from '../../../modules/medications/mocks/valid-ui-medications';
import { v4 } from 'uuid';

export interface IImportMedicationModalComponentProps {
  isOpen: boolean;
  handleClose: () => void;
  handleImport: (medications: Medication[]) => void;
}

export const ImportMedicationModal: React.FC<IImportMedicationModalComponentProps> = ({
  handleImport,
  handleClose,
  isOpen 
}) => {
  const [medications, setMedications] = useState<UIMedication[]>(ValidUIMedicationsMock);

  const handleToggle = (medication: UIMedication) => () => {
    setMedications(medications.map(_medication => {
      if (_medication.id === medication.id) {
        return {
          ..._medication,
          checked: !_medication.checked
        }
      }
      return _medication;
    }))
  };

  const handleInternalImport = () => {
    handleImport(medications.filter(_medication => _medication.checked));
    setMedications(medications.map(_medication => {
      return {
        ..._medication,
        checked: false,
        id: v4()
      }
    }))
    handleClose();
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
          {medications.map((medication) => {
            const labelId = `checkbox-list-label-${medication.id}`;
            return (
              <ListItem
                key={medication.id}
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(medication)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={medication.checked}
                      onChange={() => {
                        handleToggle(medication)
                      }}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${medication.name}  ${medication.doseUnit} | ${medication.doseAmount} a cada ${medication.frequencyInMinutes / 60} horas | ${medication.usageDurationInDays} dia${medication.usageDurationInDays > 1 ? 's' : ''}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </MedicationList>
        <ImportMedicationButton onClick={handleInternalImport}>Importar</ImportMedicationButton>
      </ContentContainer>
    </Modal>
  );
};
