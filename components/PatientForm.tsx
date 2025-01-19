import React, { useState, useEffect, useCallback } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Patient } from '../types/patient';
import { isValidWebsite } from '../helpers/validations';
import { pickImage } from '../helpers/pickImage';

interface PatientFormProps {
  onSave: (patient: Patient) => void;
  patient?: Patient;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSave, patient }) => {
  const [patientName, setPatientName] = useState('');
  const [patientDescription, setPatientDescription] = useState('');
  const [patientWebsite, setPatientWebsite] = useState('');
  const [avatarUri, setAvatarUri] = useState('');

  useEffect(() => {
    if (patient) {
      setPatientName(patient.name);
      setPatientDescription(patient.description);
      setPatientWebsite(patient.website);
      setAvatarUri(patient.avatar);
    }
  }, [patient]);

  const handleSave = useCallback(() => {
    if (
      patientName &&
      patientDescription &&
      patientWebsite &&
      isValidWebsite(patientWebsite)
    ) {
      const newPatient: Patient = {
        id: patient ? patient.id : Date.now().toString(),
        name: patientName,
        avatar: avatarUri,
        description: patientDescription,
        website: patientWebsite,
        createdAt: new Date().toISOString(),
      };
      onSave(newPatient);
      resetForm();
    }
  }, [
    patientName,
    patientDescription,
    patientWebsite,
    avatarUri,
    onSave,
    patient,
  ]);

  const resetForm = () => {
    setPatientName('');
    setPatientDescription('');
    setPatientWebsite('');
    setAvatarUri('');
  };

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setAvatarUri(uri);
    }
  };

  const isFormValid =
    patientName && patientDescription && isValidWebsite(patientWebsite);

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={handlePickImage}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={patientName}
        onChangeText={setPatientName}
        numberOfLines={1}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={patientDescription}
        numberOfLines={1}
        onChangeText={setPatientDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Website"
        value={patientWebsite}
        onChangeText={setPatientWebsite}
        numberOfLines={1}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
          onPress={handleSave}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#549be3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  avatar: {
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ccc',
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 50,
  },
});

export default PatientForm;
