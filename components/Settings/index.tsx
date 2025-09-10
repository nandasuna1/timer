import { useSettingsContext } from '@/contexts/SettingsContext';
import { Timer } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Settings() {
  const {
    notificationsEnabled,
    toggleNotifications,
    soundEnabled,
    toggleSound,
  } = useSettingsContext();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Timer size={48} />
          <Text style={styles.title}>Interval Runner</Text>
        </View>
      </View>

      <View style={styles.settingsList}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Send notifications</Text>
          <Pressable
            style={[
              styles.button,
              { backgroundColor: notificationsEnabled ? 'green' : 'red' },
            ]}
            onPress={toggleNotifications}
          >
            <Text style={styles.buttonText}>
              {notificationsEnabled ? 'On' : 'Off'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sound</Text>
          <Pressable
            style={[
              styles.button,
              { backgroundColor: soundEnabled ? 'green' : 'red' },
            ]}
            onPress={toggleSound}
          >
            <Text style={styles.buttonText}>{soundEnabled ? 'On' : 'Off'}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
    gap: 20,
    backgroundColor: '#f9fafb',
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    gap: 4,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
});
