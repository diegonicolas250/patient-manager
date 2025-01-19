import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import PatientListScreen from './screens/PatientListScreen';

export default function App() {
  const statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <SafeAreaView style={{ marginTop: statusBarHeight }}>
      <PatientListScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
