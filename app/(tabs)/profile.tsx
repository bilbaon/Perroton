import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/theme';

const MOCK_DOGS = [
  {
    id: 'dog-1',
    name: 'Biscuit',
    breed: 'Golden Retriever',
    ageMonths: 5,
    emoji: '🐕',
    program: 'Puppy Basics',
    streak: 5,
    totalSessions: 23,
    isActive: true,
  },
  {
    id: 'dog-2',
    name: 'Pepper',
    breed: 'Border Collie',
    ageMonths: 18,
    emoji: '🐩',
    program: 'Impulse Control',
    streak: 2,
    totalSessions: 47,
    isActive: false,
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>My Dogs</Text>

        {MOCK_DOGS.map((dog) => (
          <TouchableOpacity
            key={dog.id}
            style={[styles.dogCard, dog.isActive && styles.dogCardActive]}
            onPress={() => router.push(`/dog/${dog.id}`)}
            activeOpacity={0.85}
          >
            {dog.isActive && (
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>Active</Text>
              </View>
            )}
            <View style={styles.dogHeader}>
              <View style={styles.dogAvatar}>
                <Text style={{ fontSize: 40 }}>{dog.emoji}</Text>
              </View>
              <View style={styles.dogInfo}>
                <Text style={styles.dogName}>{dog.name}</Text>
                <Text style={styles.dogBreed}>{dog.breed}</Text>
                <Text style={styles.dogAge}>{dog.ageMonths} months old</Text>
              </View>
            </View>
            <View style={styles.dogStats}>
              <View style={styles.dogStat}>
                <Text style={styles.dogStatValue}>🔥 {dog.streak}</Text>
                <Text style={styles.dogStatLabel}>day streak</Text>
              </View>
              <View style={styles.dogStat}>
                <Text style={styles.dogStatValue}>📋 {dog.totalSessions}</Text>
                <Text style={styles.dogStatLabel}>sessions</Text>
              </View>
              <View style={styles.dogStat}>
                <Text style={styles.dogStatValue} numberOfLines={1}>📚 {dog.program}</Text>
                <Text style={styles.dogStatLabel}>current program</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addDogBtn}
          onPress={() => router.push('/dog/add')}
        >
          <Text style={styles.addDogText}>+ Add Another Dog</Text>
        </TouchableOpacity>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsCard}>
          {[
            { emoji: '🔔', label: 'Training Reminders' },
            { emoji: '👤', label: 'Account' },
            { emoji: '🔒', label: 'Privacy & Data' },
            { emoji: '❓', label: 'Help & Support' },
            { emoji: '🐾', label: 'When to See a Pro' },
          ].map(({ emoji, label }, i, arr) => (
            <TouchableOpacity
              key={label}
              style={[styles.settingsRow, i < arr.length - 1 && styles.settingsRowBorder]}
            >
              <Text style={styles.settingsEmoji}>{emoji}</Text>
              <Text style={styles.settingsLabel}>{label}</Text>
              <Text style={styles.settingsArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>PawProgress v1.0.0 MVP</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  heading: { fontSize: FontSize.xxxl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.lg },

  dogCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadows.md,
  },
  dogCardActive: { borderColor: Colors.primary },
  activeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
    marginBottom: Spacing.sm,
  },
  activeBadgeText: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.white },
  dogHeader: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  dogAvatar: {
    width: 64,
    height: 64,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dogInfo: { flex: 1, justifyContent: 'center' },
  dogName: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.textPrimary },
  dogBreed: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  dogAge: { fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 2 },
  dogStats: { flexDirection: 'row', gap: Spacing.sm },
  dogStat: { flex: 1, backgroundColor: Colors.background, borderRadius: Radius.sm, padding: Spacing.sm },
  dogStatValue: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.textPrimary },
  dogStatLabel: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },

  addDogBtn: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  addDogText: { fontSize: FontSize.md, fontWeight: '600', color: Colors.primary },

  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },
  settingsCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, marginBottom: Spacing.lg, ...Shadows.sm },
  settingsRow: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, gap: Spacing.md },
  settingsRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  settingsEmoji: { fontSize: 20, width: 28 },
  settingsLabel: { flex: 1, fontSize: FontSize.md, color: Colors.textPrimary },
  settingsArrow: { fontSize: FontSize.xl, color: Colors.textMuted },

  version: { textAlign: 'center', fontSize: FontSize.xs, color: Colors.textMuted, marginTop: Spacing.sm },
});
