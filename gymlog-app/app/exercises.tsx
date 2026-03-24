import { View, Text, FlatList, StyleSheet } from 'react-native';
import { EXERCISES, Exercise } from '@/data/exercises';

// Composant pour afficher une seule ligne d'exercice
// On le sépare pour garder le code lisible
function ExerciseItem({ exercise }: { exercise: Exercise }) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{exercise.name}</Text>
      <Text style={styles.muscle}>{exercise.muscle}</Text>
    </View>
  );
}

// Écran principal — liste tous les exercices disponibles
export default function ExercisesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={EXERCISES}
        keyExtractor={(item) => item.id.toString()}
        // FlatList est optimisé pour les longues listes (ne rend que ce qui est visible)
        renderItem={({ item }) => <ExerciseItem exercise={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  muscle: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
});
