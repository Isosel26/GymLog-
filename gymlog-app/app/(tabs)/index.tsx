import { View, Text, StyleSheet } from 'react-native';

// Écran d'accueil — point de départ de chaque séance
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GymLog</Text>
      <Text style={styles.subtitle}>Prêt à t'entraîner ?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
});
