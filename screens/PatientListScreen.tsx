import React, { useCallback, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { usePatients } from '../hooks/usePatients';
import PatientItem from '../components/PatientItem';
import EmptyComponent from '../components/EmptyComponent';
import { Patient } from '../types/patient';
import { FontAwesome } from '@expo/vector-icons';
import AddPatientModal from '../components/AddPatientModal';
import EditPatientModal from '../components/EditPatientModal';

const PatientListScreen = () => {
  const { patients, loading, error, onNewPatient, onEditPatient } =
    usePatients();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(
    undefined,
  );

  const handleEditPress = useCallback((patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalVisible(true);
  }, []);

  const handleAddPress = useCallback(() => {
    setIsAddModalVisible(true);
  }, []);

  const renderPatientItem = useCallback(({ item }: { item: Patient }) => {
    return (
      <PatientItem patient={item} onEditPress={() => handleEditPress(item)} />
    );
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Patient List</Text>
        <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
          <FontAwesome name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={renderPatientItem}
        ListEmptyComponent={<EmptyComponent />}
        showsVerticalScrollIndicator={false}
      />

      <AddPatientModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSave={onNewPatient}
      />

      <EditPatientModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={onEditPatient}
        patient={selectedPatient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});

export default PatientListScreen;
