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
      <Page size="A4" style={{flexDirection: 'column', display: 'flex'}}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center' , justifyContent: 'center'}}>
          <Image
            src={AppLogo} 
            style={{
              width: 200
            }}
          />
          <Image style={styles.qrCode} src={qrCodeUrl} />
        </View>
        <Text style={{marginTop: 20}}>
          Paciente: {patientName}
        </Text>
        {medications.map((medication, index) => (
            <View key={`section-${medication.id}`}>
              <Text>{medication.name}</Text>
              <View>
                <View style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <View>
                    {`${index + 1}. ${medication.name}`}
                  </View>
                </View>
                {Object.keys(medication).map((key) => {
                  if (isMedicationKeyHidden(key)) return <></>;
                  return <View key={`item-${medication}-${key}`}>
                    <Text>
                      <Text>{medicationKeyTranslator(key)}</Text>: {medication[key as keyof Medication]}
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
