import AppLogo from '../../../assets/images/logo-transparent.png';
import { Document, StyleSheet, Image, Page, Text, View } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Medication } from '../../../modules/medications/entities/Medication';
import { isMedicationKeyHidden, medicationKeyTranslator } from '../../pages/app/create-prescription/data';

const styles = StyleSheet.create({
  qrCode: {
    width: 100,
    height: 100,
  },
  horizontalRule: {height: 1, width: '90%', backgroundColor: '#ccc'},
  title: {marginTop: 30, marginBottom: 10, fontWeight: 'bold'},
  subtitle: {marginTop: 30, fontSize: 16, marginBottom: 10, fontWeight: 'bold'},
  dataText: { marginBottom: 10, fontSize: 14}

});

interface Props {
  medications: Medication[];
  patientName: string;
}

export const PrescriptionTemplate: React.FC<Props> = ({medications, patientName}) => {
  const [qrCodeUrl, setQRCodeUrl] = useState('');

  useEffect(() => {
    async function generateQRCode() {
      const url = 'https://google.com'; 
      const qrCode = await QRCode.toDataURL(url);
      setQRCodeUrl(qrCode);
    }
    generateQRCode();
  }, []);


  return (
    <Document>
      <Page 
        size="A4" 
        style={{
          flexDirection: 'column', 
          display: 'flex',
          paddingHorizontal: 16
        }}
      >
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center' , justifyContent: 'center'}}>
          <Image
            src={AppLogo} 
            style={{
              width: 200
            }}
          />
          <Image style={styles.qrCode} src={qrCodeUrl} />
        </View>
        <Text style={styles.title}>
          Paciente 
        </Text>
        <View style={styles.horizontalRule} />
        <Text style={{marginTop: 20, fontSize: 14}}>
          Nome: {patientName}
        </Text>
        <Text style={styles.title}>
          Medicamentos
        </Text>
        <View style={styles.horizontalRule} />
        {medications.map((medication, index) => (
            <View key={`section-${medication.id}`}>
              <Text style={styles.subtitle}>{`${index + 1}. ${medication.name}`}</Text>
              <View>
  
                {Object.keys(medication).map((key) => {
                  if (isMedicationKeyHidden(key)) return <></>;
                  return <View key={`item-${medication}-${key}`}>
                    <Text style={styles.dataText}>
                      <Text style={styles.dataText}>{medicationKeyTranslator(key)}</Text>: {medication[key as keyof Medication]}
                    </Text>
                  </View>
                })}
                
              </View>
            </View>
          )) }
      </Page>
    </Document>
  );
};
