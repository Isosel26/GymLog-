import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useWorkout, WorkoutExercise } from '@/context/WorkoutContext';

// Composant pour un exercice dans la séance avec ses séries
function ExerciseCard({ item }: { item: WorkoutExercise }) {
  const { addSet, updateSet } = useWorkout();

  return (
    <View style={styles.card}>
      <Text style={styles.exerciseName}>{item.exercise.name}</Text>
      <Text style={styles.muscle}>{item.exercise.muscle}</Text>

      {/* En-tête des colonnes */}
      <View style={styles.setHeader}>
        <Text style={styles.setHeaderText}>Série</Text>
        <Text style={styles.setHeaderText}>Poids (kg)</Text>
        <Text style={styles.setHeaderText}>Reps</Text>
      </View>

      {/* Liste des séries */}
      {item.sets.map((set, index) => (
        <View key={index} style={styles.setRow}>
          <Text style={styles.setNumber}>{index + 1}</Text>
          {/* Champ poids */}
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            value={set.weight}
            onChangeText={(val) => updateSet(item.exercise.id, index, 'weight', val)}
          />
          {/* Champ répétitions */}
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            value={set.reps}
            onChangeText={(val) => updateSet(item.exercise.id, index, 'reps', val)}
          />
        </View>
      ))}

      {/* Bouton pour ajouter une série */}
      <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(item.exercise.id)}>
        <Text style={styles.addSetText}>+ Ajouter une série</Text>
      </TouchableOpacity>
    </View>
  );
}

// Écran principal de la séance en cours
export default function WorkoutScreen() {
  const router = useRouter();
  const { workoutExercises, clearWorkout } = useWorkout();

  const handleFinish = () => {
    Alert.alert(
      'Terminer la séance',
      'Veux-tu sauvegarder et terminer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Terminer',
          onPress: () => {
            // Pour l'instant on vide juste la séance (la sauvegarde viendra avec le backend)
            clearWorkout();
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {workoutExercises.length === 0 ? (
        // Si aucun exercice, afficher un message
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Aucun exercice ajouté</Text>
          <TouchableOpacity onPress={() => router.push('/exercises')}>
            <Text style={styles.emptyLink}>+ Ajouter un exercice</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Sinon afficher la liste des exercices
        <FlatList
          data={workoutExercises}
          keyExtractor={(item) => item.exercise.id.toString()}
          renderItem={({ item }) => <ExerciseCard item={item} />}
          ListFooterComponent={
            <View style={styles.footer}>
              {/* Bouton pour ajouter un autre exercice */}
              <TouchableOpacity style={styles.addExerciseButton} onPress={() => router.push('/exercises')}>
                <Text style={styles.addExerciseText}>+ Ajouter un exercice</Text>
              </TouchableOpacity>
              {/* Bouton pour terminer la séance */}
              <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                <Text style={styles.finishText}>Terminer la séance</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 12,
    padding: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  muscle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 12,
  },
  setHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  setHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#aaa',
    fontWeight: '600',
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  setNumber: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    color: '#555',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
    marginHorizontal: 4,
    fontSize: 15,
  },
  addSetButton: {
    marginTop: 8,
    alignItems: 'center',
    padding: 8,
  },
  addSetText: {
    color: '#E63946',
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  emptyLink: {
    marginTop: 12,
    color: '#E63946',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    gap: 12,
  },
  addExerciseButton: {
    borderWidth: 1,
    borderColor: '#E63946',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  addExerciseText: {
    color: '#E63946',
    fontWeight: '600',
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: '#E63946',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  finishText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
