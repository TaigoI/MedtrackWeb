import React, { createContext, useContext, useEffect, useState } from 'react';
import { AxiosHttpClient } from '../../infra/http/AxiosHttpClient';
import { Prescription } from '../../modules/prescriptions/entities/Prescription';
import { findPrescriptionsUseCase } from '../../modules/prescriptions/useCases/FindPrescriptionsUseCase';

interface Props {
  prescriptions: Prescription[];
  setPrescriptions: (_: Prescription[]) => void;
  patientName: string;
  setPatientName: (_: string) => void;
}

const MedicationContext = createContext({} as Props);

const MedicationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    (async () => {
      setPrescriptions(await findPrescriptionsUseCase.execute({
        page: 0,
        size: 20,
        templatesOnly: true
      }));
    })()
  }, []);

  useEffect(() => console.log('🙈',prescriptions), [prescriptions])

  return (
    <MedicationContext.Provider value={{
      prescriptions,
      setPrescriptions,
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