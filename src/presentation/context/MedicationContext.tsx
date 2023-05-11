import React, { createContext, useContext, useState } from 'react';
import { UIMedication } from '../../modules/medications/entities/UIMedication';

interface Props {
  medications: UIMedication[];
  setMedications: (_: UIMedication[]) => void;
  patientName: string;
  setPatientName: (_: string) => void;
}

const MedicationContext = createContext({} as Props);

const MedicationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [medications, setMedications] = useState<UIMedication[]>([]);
  const [patientName, setPatientName] = useState('');

  return (
    <MedicationContext.Provider value={{
      medications,
      setMedications,
      patientName,
      setPatientName
    }}>
      {children}
    </MedicationContext.Provider>
  );
};

function useMedication() {
  return useContext(MedicationContext);
}

export { useMedication, MedicationProvider };