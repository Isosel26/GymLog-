// Liste d'exercices en dur — sera remplacée par l'API Laravel plus tard
// Chaque exercice a un id unique, un nom, et un groupe musculaire
export type Exercise = {
  id: number;
  name: string;
  muscle: string;
};

export const EXERCISES: Exercise[] = [
  { id: 1, name: 'Développé couché', muscle: 'Pectoraux' },
  { id: 2, name: 'Squat', muscle: 'Quadriceps' },
  { id: 3, name: 'Soulevé de terre', muscle: 'Dos' },
  { id: 4, name: 'Tractions', muscle: 'Dos' },
  { id: 5, name: 'Développé militaire', muscle: 'Épaules' },
  { id: 6, name: 'Curl biceps', muscle: 'Biceps' },
  { id: 7, name: 'Extensions triceps', muscle: 'Triceps' },
  { id: 8, name: 'Leg press', muscle: 'Quadriceps' },
  { id: 9, name: 'Rowing barre', muscle: 'Dos' },
  { id: 10, name: 'Hip thrust', muscle: 'Fessiers' },
];
