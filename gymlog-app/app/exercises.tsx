import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { EXERCISES, Exercise } from '@/data/exercises';
import { useWorkout } from '@/context/WorkoutContext';

// Composant pour une ligne d'exercice — avec bouton d'ajout
function ExerciseItem({ exercise, onAdd }: { exercise: Exercise; onAdd: () => void }) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.muscle}>{exercise.muscle}</Text>
      </View>
      {/* Bouton "+" pour ajouter l'exercice à la séance */}
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

// Écran de sélection d'exercices
export default function ExercisesScreen() {
  const router = useRouter();
  const { addExercise, workoutExercises } = useWorkout();

  const handleAdd = (exercise: Exercise) => {
    // Vérifie si l'exercice est déjà dans la séance
    const alreadyAdded = workoutExercises.some((e) => e.exercise.id === exercise.id);
    if (alreadyAdded) return; // ne pas ajouter deux fois le même

    addExercise(exercise);
    router.back(); // retour à l'écran précédent après sélection
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={EXERCISES}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExerciseItem exercise={item} onAdd={() => handleAdd(item)} />
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  addButton: {
    backgroundColor: '#E63946',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 26,
  },
});
