import { Modal, Typography, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ContentContainer, ImportMedicationButton, MedicationList } from './styles';
import { Medication } from '../../../modules/medications/entities/Medication';
// import { ValidUIMedicationsMock } from '../../../modules/medications/mocks/valid-ui-medications';
import { v4 } from 'uuid';
import { Prescription } from '../../../modules/prescriptions/entities/Prescription';
import { useMedication } from '../../context/MedicationContext';

export interface IImportMedicationModalComponentProps {
  isOpen: boolean;
  handleClose: () => void;
  handleImport: (medications: Prescription[]) => void;
}

export const ImportMedicationModal: React.FC<IImportMedicationModalComponentProps> = ({
  handleImport,
  handleClose,
  isOpen 
}) => {
  const {prescriptions} = useMedication();
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    if (prescriptions) {
      setSelectedPrescriptions(prescriptions.map(item => ({
        ...item,
        checked: false,
      })))
    }
  }, [prescriptions])

  const handleToggle = (prescription: Prescription) => () => {
    setSelectedPrescriptions(selectedPrescriptions.map(_prescription => {
      if (_prescription.id === prescription.id){ 
        return {
          ..._prescription,
          checked: !_prescription.checked,
        }
      }
      return _prescription
    }))
  };

  const handleInternalImport = () => {
    handleImport(prescriptions.filter(_prescription => _prescription.checked));
    setSelectedPrescriptions(prescriptions.map(_prescription => {
      return {
        ..._prescription,
        checked: false,
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
          {selectedPrescriptions.map((prescription: Prescription) => {
            const labelId = `checkbox-list-label-${prescription.id}`;
            return (
              <ListItem
                key={prescription.id}
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(prescription)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={prescription.checked}
                      onChange={() => {
                        handleToggle(prescription)
                      }}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={prescription.templateTitle} />
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
