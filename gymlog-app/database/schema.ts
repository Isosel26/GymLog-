import db from './db';

// Crée toutes les tables si elles n'existent pas encore
// "IF NOT EXISTS" = safe à appeler à chaque démarrage de l'app
export function initDatabase() {

  // Profil de l'utilisateur (1 seule ligne)
  db.execSync(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY,
      goal TEXT,   -- prise_de_masse | seche | force | esthetique
      level TEXT   -- debutant | intermediaire | avance
    );
  `);

  // Séances terminées
  db.execSync(`
    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,     -- date ISO ex: "2026-03-25"
      duration INTEGER,       -- durée en secondes
      notes TEXT
    );
  `);

  // Exercices d'une séance (chaque série est une ligne)
  db.execSync(`
    CREATE TABLE IF NOT EXISTS workout_sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_id INTEGER NOT NULL,
      exercise_name TEXT NOT NULL,
      muscle TEXT,
      set_number INTEGER,     -- numéro de la série (1, 2, 3...)
      weight REAL,            -- poids en kg
      reps INTEGER,
      rir INTEGER,            -- Reps In Reserve (effort perçu)
      FOREIGN KEY (workout_id) REFERENCES workouts(id)
    );
  `);
}
