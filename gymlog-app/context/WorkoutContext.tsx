import { createContext, useContext, useState, ReactNode } from 'react';
import { Exercise } from '@/data/exercises';

// Une "série" dans un exercice : poids + répétitions + RIR
export type Set = {
  weight: string;
  reps: string;
  rir: string; // Reps In Reserve : combien de reps tu aurais pu faire encore (0 = échec, 3 = 3 reps en réserve)
};

// Un exercice dans la séance, avec ses séries
export type WorkoutExercise = {
  exercise: Exercise;
  sets: Set[];
};

// La forme complète du contexte
type WorkoutContextType = {
  workoutExercises: WorkoutExercise[];   // exercices de la séance en cours
  addExercise: (exercise: Exercise) => void;   // ajouter un exercice
  removeExercise: (id: number) => void;        // retirer un exercice
  addSet: (exerciseId: number) => void;        // ajouter une série à un exercice
  updateSet: (exerciseId: number, setIndex: number, field: 'weight' | 'reps' | 'rir', value: string) => void; // modifier poids/reps/rir
  clearWorkout: () => void;                    // vider la séance (après sauvegarde)
};

// Création du contexte avec une valeur par défaut vide
const WorkoutContext = createContext<WorkoutContextType | null>(null);

// Provider : englobe l'app pour rendre le contexte accessible partout
export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);

  // Ajouter un exercice à la séance (avec une série vide par défaut)
  const addExercise = (exercise: Exercise) => {
    setWorkoutExercises((prev) => [
      ...prev,
      { exercise, sets: [{ weight: '', reps: '', rir: '' }] },
    ]);
  };

  // Retirer un exercice de la séance
  const removeExercise = (id: number) => {
    setWorkoutExercises((prev) => prev.filter((e) => e.exercise.id !== id));
  };

  // Ajouter une série vide à un exercice
  const addSet = (exerciseId: number) => {
    setWorkoutExercises((prev) =>
      prev.map((e) =>
        e.exercise.id === exerciseId
          ? { ...e, sets: [...e.sets, { weight: '', reps: '', rir: '' }] }
          : e
      )
    );
  };

  // Mettre à jour le poids ou les reps d'une série
  const updateSet = (exerciseId: number, setIndex: number, field: 'weight' | 'reps' | 'rir', value: string) => {
    setWorkoutExercises((prev) =>
      prev.map((e) => {
        if (e.exercise.id !== exerciseId) return e;
        const newSets = [...e.sets];
        newSets[setIndex] = { ...newSets[setIndex], [field]: value };
        return { ...e, sets: newSets };
      })
    );
  };

  // Vider la séance complète
  const clearWorkout = () => setWorkoutExercises([]);

  return (
    <WorkoutContext.Provider value={{ workoutExercises, addExercise, removeExercise, addSet, updateSet, clearWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte facilement dans n'importe quel écran
export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('useWorkout doit être utilisé dans un WorkoutProvider');
  return context;
}
