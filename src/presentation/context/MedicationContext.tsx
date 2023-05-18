import React, { createContext, useContext, useEffect, useState } from 'react';
import { AxiosHttpClient } from '../../infra/http/AxiosHttpClient';
import { Prescription } from '../../modules/prescriptions/entities/Prescription';
import { findPrescriptionsUseCase } from '../../modules/prescriptions/useCases/FindPrescriptionsUseCase';
import { PrescriptionItem } from '../../modules/prescriptions/entities/PrescriptionItem';
import { useAuthentication } from './AuthenticationContext';

interface Props {
  prescriptions: Prescription[];
  setPrescriptions: React.Dispatch<React.SetStateAction<Prescription[]>>
  prescriptionItems: PrescriptionItem[];
  setPrescriptionItems: React.Dispatch<React.SetStateAction<PrescriptionItem[]>>;
  patientName: string;
  setPatientName: (_: string) => void;
}

const MedicationContext = createContext({} as Props);

const MedicationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const {user} = useAuthentication();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [prescriptionItems, setPrescriptionItems] = React.useState<PrescriptionItem[]>([]);
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    (async () => {
      if (!user) return;
      setPrescriptions(await findPrescriptionsUseCase.execute({
        page: 0,
        size: 20,
        templatesOnly: true
      }));
    })()
  }, [user]);

  return (
    <MedicationContext.Provider value={{
      prescriptions,
      setPrescriptions,
      prescriptionItems, setPrescriptionItems,
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