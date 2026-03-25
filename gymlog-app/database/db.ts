import * as SQLite from 'expo-sqlite';

// On ouvre la base une seule fois et on la réutilise partout
// C'est le pattern "singleton" — une seule instance pour toute l'app
const db = SQLite.openDatabaseSync('gymlog.db');

export default db;
