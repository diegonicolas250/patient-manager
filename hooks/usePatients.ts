import { useState, useEffect } from 'react';
import { Patient } from '../types/patient';

const API_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const onNewPatient = (patient: Patient) => {
    // TODO POST REQUEST for adding new patient
    setPatients((prevPatients) => [patient, ...prevPatients]);
  };

  const onEditPatient = (editedPatient: Patient) => {
    // TODO PUT REQUEST for updating patient
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === editedPatient.id ? editedPatient : patient,
      ),
    );
  };

  return { patients, loading, error, onNewPatient, onEditPatient };
};
