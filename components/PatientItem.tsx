import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Linking,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Patient } from '../types/patient';

interface PatientItemProps {
  patient: Patient;
  onEditPress: () => void;
}

const PatientItem: React.FC<PatientItemProps> = ({ patient, onEditPress }) => {
  const [expanded, setExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
    Animated.timing(heightAnim, {
      toValue: expanded ? 0 : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleOpenUrl = () => {
    const url = patient.website;
    if (url && Linking.canOpenURL(url)) {
      Linking.openURL(url);
    } else {
      alert('Invalid URL');
    }
  };
  return (
    <View style={styles.card}>
      <Image source={{ uri: patient.avatar }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.name}>{patient.name}</Text>

          <TouchableOpacity onPress={onEditPress}>
            <FontAwesome name="edit" size={22} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleOpenUrl}>
          <Text style={styles.website}>{patient.website}</Text>
        </TouchableOpacity>

        <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
          <Text style={styles.description}>{patient.description}</Text>
        </Animated.View>

        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
          onPress={toggleExpand}
        >
          <FontAwesome
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#007bff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  website: {
    fontSize: 12,
    color: '#007bff',
  },
  description: {
    fontSize: 12,
    color: '#777',
  },
});

export default PatientItem;
