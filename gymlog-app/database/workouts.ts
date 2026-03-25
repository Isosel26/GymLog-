import db from './db';
import { WorkoutExercise } from '@/context/WorkoutContext';

// Sauvegarde une séance complète dans la base
// Retourne l'id de la séance créée
export function saveWorkout(exercises: WorkoutExercise[], durationSeconds: number): number {
  const date = new Date().toISOString().split('T')[0]; // ex: "2026-03-25"

  // 1. Créer la séance
  const result = db.runSync(
    'INSERT INTO workouts (date, duration) VALUES (?, ?)',
    [date, durationSeconds]
  );
  const workoutId = result.lastInsertRowId;

  // 2. Insérer chaque série de chaque exercice
  for (const item of exercises) {
    item.sets.forEach((set, index) => {
      db.runSync(
        `INSERT INTO workout_sets
          (workout_id, exercise_name, muscle, set_number, weight, reps, rir)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          workoutId,
          item.exercise.name,
          item.exercise.muscle,
          index + 1,
          parseFloat(set.weight) || 0,
          parseInt(set.reps) || 0,
          parseInt(set.rir) || 0,
        ]
      );
    });
  }

  return workoutId;
}

// Récupère toutes les séances avec le nombre d'exercices
export function getWorkouts() {
  return db.getAllSync<{
    id: number;
    date: string;
    duration: number;
    exercise_count: number;
  }>(`
    SELECT w.id, w.date, w.duration,
      COUNT(DISTINCT ws.exercise_name) as exercise_count
    FROM workouts w
    LEFT JOIN workout_sets ws ON ws.workout_id = w.id
    GROUP BY w.id
    ORDER BY w.date DESC
  `);
}

// Récupère le détail d'une séance (toutes les séries)
export function getWorkoutDetail(workoutId: number) {
  return db.getAllSync<{
    exercise_name: string;
    muscle: string;
    set_number: number;
    weight: number;
    reps: number;
    rir: number;
  }>(
    'SELECT * FROM workout_sets WHERE workout_id = ? ORDER BY exercise_name, set_number',
    [workoutId]
  );
}
