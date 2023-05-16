import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import { PrescriptionTemplate } from '../../../templates/prescription';
import { useMedication } from '../../../context/MedicationContext';


export const PrescriptionScreen: React.FC = () => {
  const { patientName } = useMedication()
  return (
    <div style={{width: '100vw', height: '100vh', margin: 0, padding: 0}}>
      <PDFViewer width="100%" height="100%" style={{margin: 0, padding: 0}}>
        <PrescriptionTemplate patientName={patientName} medications={[]}/>
      </PDFViewer>
    </div>
  );
};
