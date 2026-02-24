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

const MOCK_DOG = { name: 'Biscuit', breed: 'Golden Retriever', streak: 5 };
const MOCK_SESSION = {
  id: 'session-1',
  title: 'Sit, Name & Eye Contact',
  programTitle: 'Puppy Basics',
  week: 1,
  day: 1,
  durationMinutes: 15,
  exerciseCount: 4,
};

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.subtitle}>Ready to train today?</Text>
          </View>
          <TouchableOpacity style={styles.dogChip}>
            <Text style={styles.dogChipText}>🐾 {MOCK_DOG.name}</Text>
          </TouchableOpacity>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <View>
            <Text style={styles.streakCount}>{MOCK_DOG.streak} day streak</Text>
            <Text style={styles.streakSub}>Keep it going!</Text>
          </View>
        </View>

        {/* Today's Session */}
        <Text style={styles.sectionTitle}>Today's Session</Text>
        <TouchableOpacity
          style={styles.sessionCard}
          onPress={() => router.push(`/session/${MOCK_SESSION.id}`)}
          activeOpacity={0.85}
        >
          <View style={styles.sessionMeta}>
            <Text style={styles.sessionProgram}>{MOCK_SESSION.programTitle}</Text>
            <Text style={styles.sessionWeek}>
              Week {MOCK_SESSION.week} · Day {MOCK_SESSION.day}
            </Text>
          </View>
          <Text style={styles.sessionTitle}>{MOCK_SESSION.title}</Text>
          <View style={styles.sessionFooter}>
            <Text style={styles.sessionStat}>⏱ {MOCK_SESSION.durationMinutes} min</Text>
            <Text style={styles.sessionStat}>📝 {MOCK_SESSION.exerciseCount} exercises</Text>
          </View>
          <View style={styles.startBtn}>
            <Text style={styles.startBtnText}>Start Session →</Text>
          </View>
        </TouchableOpacity>

        {/* Quick Stats */}
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Sessions done</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>of 6 planned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>83%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  greeting: { fontSize: FontSize.xxl, fontWeight: '700', color: Colors.textPrimary },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: 2 },
  dogChip: {
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  dogChipText: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.primary },

  streakCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  streakEmoji: { fontSize: 36 },
  streakCount: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.white },
  streakSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },

  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  sessionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  sessionMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs },
  sessionProgram: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.primary },
  sessionWeek: { fontSize: FontSize.sm, color: Colors.textMuted },
  sessionTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  sessionFooter: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  sessionStat: { fontSize: FontSize.sm, color: Colors.textSecondary },
  startBtn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  startBtnText: { fontSize: FontSize.md, fontWeight: '700', color: Colors.white },

  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statValue: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.primary },
  statLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, textAlign: 'center', marginTop: 2 },
});
