import { Tabs } from 'expo-router';

// Layout des onglets principaux de l'app
// Chaque Tabs.Screen correspond à un fichier dans ce dossier
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#E63946', // couleur principale GymLog
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Historique',
          tabBarLabel: 'Historique',
        }}
      />
    </Tabs>
  );
}
