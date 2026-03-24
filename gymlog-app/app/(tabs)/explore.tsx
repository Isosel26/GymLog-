import { View, Text, StyleSheet } from 'react-native';

// Écran Historique — liste des séances passées (à venir)
export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique</Text>
      <Text style={styles.subtitle}>Tes séances apparaîtront ici</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginTop: 8,
  },
});
