import React, { createContext, useContext, useState } from 'react';
import { Medication } from '../../modules/medications/entities/Medication';

interface Props {
  medications: Medication[];
  setMedications: (_: Medication[]) => void;
  patientName: string;
  setPatientName: (_: string) => void;
}

const MedicationContext = createContext({} as Props);

const MedicationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
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