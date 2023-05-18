import AppLogo from '../../../assets/images/logo-transparent.png';
import { Document, StyleSheet, Image, Page, Text, View } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { intervalMapper } from '../../pages/app/create-prescription/data';
import { PrescriptionItem } from '../../../modules/prescriptions/entities/PrescriptionItem';
import { User } from '../../../modules/authentication/entities/User';

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
  prescriptionItems: PrescriptionItem[];
  patientName: string;
  user: User;
}

export const PrescriptionTemplate: React.FC<Props> = ({prescriptionItems, patientName, user}) => {
  const [qrCodeUrl, setQRCodeUrl] = useState('');

  useEffect(() => {
    async function generateQRCode() {
    //   {
    //     "id": 1,
    //     "patientName": "Adsa",
    //     "doctorName": "Rui Fernandes",
    //     "doctorRegistration": "123456",
    //     "medications": [
    //         {
    //             "medicationName": "Trodelvy",
    //             "medicationDosage": "200 MG/",
    //             "doseAmount": 0,
    //             "doseUnit": "Pó Liofilizado Para Solução Injetável",
    //             "interval": 0,
    //             "intervalUnit": "minute",
    //             "occurrences": 0,
    //             "comments": "-"
    //         }
    //     ]
    // }
      // const data = {
      //   "id": 1,
      //   "patientName": "João",
      //   "doctorName": "Dr. Carlos",
      //   "doctorRegistration": "123456",
      //   "medications": [
      //        {
      //            "medicationName": "Paracetamol",
      //            "medicationDosage": "500 MG/ML",
      //            "doseAmount": 5,
      //            "doseUnit": "pill",
      //            "interval": 6,
      //            "intervalUnit": "hour",
      //            "occurrences": 10,
      //            "comments": "Tomar com água"
      //        },
      //        {
      //            "medicationName": "Dipirona",
      //            "medicationDosage": "500 MG/ML",
      //            "doseAmount": 5,
      //            "doseUnit": "pill",
      //            "interval": 6,
      //            "intervalUnit": "hour",
      //            "occurrences": 10,
      //            "comments": "Tomar com água"
      //        }
      //   ] 
      // }
      const data = {
        id: 1,
        patientName: patientName,
        doctorName: user.name,
        doctorRegistration: user.councilRegistration || '',
        medications: prescriptionItems.map(item => ({
          medicationName: item.medicationPresentation.medication.name,
          medicationDosage: `${item.medicationPresentation.dosage.amount} ${item.medicationPresentation.dosage.unit}`,
          doseAmount: item.doseAmount,
          // doseUnit: item.medicationPresentation.presentation.searchable,
          doseUnit: 'pill', 
          interval: item.interval,
          intervalUnit: item.intervalUnit,
          occurrences: item.occurrences,
          comments: item.comments 
        })) 
      }
      console.log(data)
      const qrCode = await QRCode.toDataURL(JSON.stringify
        (data));
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
        {prescriptionItems.map((prescriptionItem, index) => (
            <View key={`section-${prescriptionItem.id}`}>
              <Text style={styles.subtitle}>{`${index + 1}. ${prescriptionItem.medicationPresentation.medication.name}`}</Text>
              <View>
                <View>
                  <Text style={styles.dataText}>
                    <Text>Dosagem</Text>: {prescriptionItem.medicationPresentation.dosage.amount}{prescriptionItem.medicationPresentation.dosage.unit}
                  </Text>
                </View>
                <View>
                  <Text style={styles.dataText}>
                    <Text>Tipo</Text>: {prescriptionItem.medicationPresentation.presentation.name}
                  </Text>
                </View>
                <View>
                  <Text style={styles.dataText}>
                    <Text>Dose</Text>: {prescriptionItem.doseAmount}
                  </Text>
                </View>
                <View>
                  <Text style={styles.dataText}>
                    <Text>A cada</Text>: {prescriptionItem.interval}{intervalMapper[prescriptionItem.intervalUnit]}
                  </Text>
                </View>
                
              </View>
            </View>
          )) }
      </Page>
    </Document>
  );
};
