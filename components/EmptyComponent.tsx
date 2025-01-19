import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const EmptyComponent: React.FC = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.empty}>No patients available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 18,
    color: '#999',
  },
});

export default EmptyComponent;
