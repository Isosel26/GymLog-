import db from './db';

export type Profile = {
  goal: 'prise_de_masse' | 'seche' | 'force' | 'esthetique';
  level: 'debutant' | 'intermediaire' | 'avance';
};

// Récupère le profil (retourne null si pas encore créé)
export function getProfile(): Profile | null {
  const row = db.getFirstSync<Profile>('SELECT goal, level FROM profile WHERE id = 1');
  return row ?? null;
}

// Sauvegarde ou met à jour le profil (INSERT OR REPLACE = upsert)
export function saveProfile(profile: Profile): void {
  db.runSync(
    'INSERT OR REPLACE INTO profile (id, goal, level) VALUES (1, ?, ?)',
    [profile.goal, profile.level]
  );
}
