import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getWorkoutDetail } from '@/database/workouts';

type SetRow = {
  exercise_name: string;
  muscle: string;
  set_number: number;
  weight: number;
  reps: number;
  rir: number;
};

// Regroupe les séries par exercice pour l'affichage
function groupByExercise(sets: SetRow[]) {
  const map: Record<string, SetRow[]> = {};
  for (const s of sets) {
    if (!map[s.exercise_name]) map[s.exercise_name] = [];
    map[s.exercise_name].push(s);
  }
  return Object.entries(map); // [["Squat", [...]], ["Bench", [...]]]
}

export default function WorkoutDetailScreen() {
  // Récupère l'id passé dans l'URL (ex: /workout-detail?id=1)
  const { id } = useLocalSearchParams<{ id: string }>();
  const sets = getWorkoutDetail(Number(id));
  const grouped = groupByExercise(sets);

  return (
    <FlatList
      data={grouped}
      keyExtractor={([name]) => name}
      style={styles.list}
      renderItem={({ item: [name, exerciseSets] }) => (
        <View style={styles.card}>
          <Text style={styles.exerciseName}>{name}</Text>
          <Text style={styles.muscle}>{exerciseSets[0].muscle}</Text>

          {/* En-tête */}
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header]}>Série</Text>
            <Text style={[styles.cell, styles.header]}>Poids</Text>
            <Text style={[styles.cell, styles.header]}>Reps</Text>
            <Text style={[styles.cell, styles.header]}>RIR</Text>
          </View>

          {/* Séries */}
          {exerciseSets.map((s) => (
            <View key={s.set_number} style={styles.row}>
              <Text style={styles.cell}>{s.set_number}</Text>
              <Text style={styles.cell}>{s.weight} kg</Text>
              <Text style={styles.cell}>{s.reps}</Text>
              <Text style={styles.cell}>{s.rir}</Text>
            </View>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: '#f5f5f5' },
  card: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 12,
    padding: 16,
  },
  exerciseName: { fontSize: 17, fontWeight: 'bold' },
  muscle: { fontSize: 13, color: '#888', marginBottom: 12 },
  row: { flexDirection: 'row', marginBottom: 6 },
  cell: { flex: 1, textAlign: 'center', fontSize: 14, color: '#333' },
  header: { color: '#aaa', fontSize: 12, fontWeight: '600' },
});
