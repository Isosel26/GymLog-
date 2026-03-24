import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

// Écran d'accueil — point de départ de chaque séance
export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GymLog</Text>
      <Text style={styles.subtitle}>Prêt à t'entraîner ?</Text>

      {/* Démarre une nouvelle séance vide */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/workout')}
      >
        <Text style={styles.buttonText}>Nouvelle séance</Text>
      </TouchableOpacity>
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
  button: {
    marginTop: 32,
    backgroundColor: '#E63946',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
