import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { getWorkouts } from '@/database/workouts';

// Type pour une ligne de la requête SQL
type WorkoutRow = {
  id: number;
  date: string;
  duration: number;
  exercise_count: number;
};

// Formate une durée en secondes → "45 min" ou "1h 02"
function formatDuration(seconds: number): string {
  if (!seconds) return '-';
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return `${h}h ${rem.toString().padStart(2, '0')}`;
}

// Formate une date ISO → "25 mars 2026"
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Composant pour une ligne de séance
function WorkoutItem({ item, onPress }: { item: WorkoutRow; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
        <Text style={styles.meta}>
          {item.exercise_count} exercice{item.exercise_count > 1 ? 's' : ''} · {formatDuration(item.duration)}
        </Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

// Écran Historique — liste toutes les séances passées
export default function HistoryScreen() {
  const [workouts, setWorkouts] = useState<WorkoutRow[]>([]);
  const router = useRouter();

  // useFocusEffect recharge les données à chaque fois qu'on revient sur cet onglet
  useFocusEffect(
    useCallback(() => {
      const data = getWorkouts();
      setWorkouts(data);
    }, [])
  );

  if (workouts.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Aucune séance enregistrée</Text>
        <Text style={styles.emptyHint}>Termine une séance pour la voir apparaître ici</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={workouts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <WorkoutItem
          item={item}
          onPress={() => router.push(`/workout-detail?id=${item.id}`)}
        />
      )}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#f5f5f5',
  },
  item: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  arrow: {
    fontSize: 24,
    color: '#ccc',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  emptyHint: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 8,
  },
});
