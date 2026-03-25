import { View, Text, TouchableOpacity, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { getProfile, saveProfile, Profile } from '@/database/profile';

// Options disponibles pour chaque champ
const GOALS: { value: Profile['goal']; label: string; emoji: string }[] = [
  { value: 'prise_de_masse', label: 'Prise de masse', emoji: '💪' },
  { value: 'seche', label: 'Sèche', emoji: '🔥' },
  { value: 'force', label: 'Force', emoji: '🏋️' },
  { value: 'esthetique', label: 'Esthétique', emoji: '✨' },
];

const LEVELS: { value: Profile['level']; label: string }[] = [
  { value: 'debutant', label: 'Débutant' },
  { value: 'intermediaire', label: 'Intermédiaire' },
  { value: 'avance', label: 'Avancé' },
];

// Composant bouton de sélection réutilisable
function SelectButton({
  label,
  emoji,
  selected,
  onPress,
  width,
}: {
  label: string;
  emoji?: string;
  selected: boolean;
  onPress: () => void;
  width?: number;
}) {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.optionSelected, width ? { width } : {}]}
      onPress={onPress}
    >
      {emoji && <Text style={styles.emoji}>{emoji}</Text>}
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const [goal, setGoal] = useState<Profile['goal']>('prise_de_masse');
  const [level, setLevel] = useState<Profile['level']>('intermediaire');
  const { width } = useWindowDimensions();
  // Padding 20 de chaque côté + 1 gap de 10 entre 2 boutons
  const goalButtonWidth = (width - 40 - 10) / 2;
  // Padding 20 de chaque côté + 2 gaps de 10 entre 3 boutons
  const levelButtonWidth = (width - 40 - 20) / 3;

  // Charge le profil existant à chaque fois qu'on arrive sur cet onglet
  useFocusEffect(
    useCallback(() => {
      const profile = getProfile();
      if (profile) {
        setGoal(profile.goal);
        setLevel(profile.level);
      }
    }, [])
  );

  const handleSave = () => {
    saveProfile({ goal, level });
    Alert.alert('Profil sauvegardé', 'Tes préférences ont été enregistrées.');
  };

  return (
    <View style={styles.container}>
      {/* Section objectif */}
      <Text style={styles.sectionTitle}>Mon objectif</Text>
      <View style={styles.grid}>
        {GOALS.map((g) => (
          <SelectButton
            key={g.value}
            label={g.label}
            emoji={g.emoji}
            selected={goal === g.value}
            onPress={() => setGoal(g.value)}
            width={goalButtonWidth}
          />
        ))}
      </View>

      {/* Section niveau */}
      <Text style={styles.sectionTitle}>Mon niveau</Text>
      <View style={styles.row}>
        {LEVELS.map((l) => (
          <SelectButton
            key={l.value}
            label={l.label}
            selected={level === l.value}
            onPress={() => setLevel(l.value)}
            width={levelButtonWidth}
          />
        ))}
      </View>

      {/* Bouton sauvegarder */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Sauvegarder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    minWidth: '28%',
  },
  optionSelected: {
    borderColor: '#E63946',
    backgroundColor: '#fff0f1',
  },
  emoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  optionText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#E63946',
    fontWeight: '700',
  },
  saveButton: {
    marginTop: 40,
    backgroundColor: '#E63946',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
