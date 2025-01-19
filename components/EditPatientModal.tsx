import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PatientForm from './PatientForm';
import { Patient } from '../types/patient';

interface AddPatientModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (patient: Patient) => void;
  patient: Patient;
}

const EditPatientModal: React.FC<AddPatientModalProps> = ({
  visible,
  onClose,
  onSave,
  patient,
}) => {
  const handleOnSave = (patient: Patient) => {
    onSave(patient);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={onClose}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Edit Patient</Text>

        <PatientForm patient={patient} onSave={handleOnSave} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default EditPatientModal;
