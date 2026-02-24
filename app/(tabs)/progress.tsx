import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/theme';

const MOCK_HISTORY = [
  { id: '1', date: 'Today', sessionTitle: 'Sit, Name & Eye Contact', program: 'Puppy Basics', duration: 14, exercises: 4, pawRating: 4 },
  { id: '2', date: 'Yesterday', sessionTitle: 'Leash Introduction', program: 'Puppy Basics', duration: 16, exercises: 4, pawRating: 5 },
  { id: '3', date: 'Feb 22', sessionTitle: 'Crate Training Basics', program: 'Puppy Basics', duration: 12, exercises: 3, pawRating: 3 },
  { id: '4', date: 'Feb 20', sessionTitle: 'Bite Inhibition', program: 'Puppy Basics', duration: 18, exercises: 5, pawRating: 4 },
  { id: '5', date: 'Feb 19', sessionTitle: 'Name & Recall Foundation', program: 'Puppy Basics', duration: 13, exercises: 4, pawRating: 5 },
];

const WEEKLY_DATA = [
  { week: 'Jan 27', completed: 2, planned: 3 },
  { week: 'Feb 3', completed: 3, planned: 3 },
  { week: 'Feb 10', completed: 1, planned: 3 },
  { week: 'Feb 17', completed: 3, planned: 3 },
  { week: 'Feb 24', completed: 2, planned: 3 },
];

function PawRating({ rating }: { rating: number }) {
  return (
    <Text style={{ fontSize: 14 }}>
      {Array.from({ length: 5 }, (_, i) => i < rating ? '🐾' : '○').join('')}
    </Text>
  );
}

function WeekBar({ completed, planned, week }: { completed: number; planned: number; week: string }) {
  const pct = completed / planned;
  return (
    <View style={styles.barContainer}>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { height: `${pct * 100}%` as any }]} />
      </View>
      <Text style={styles.barLabel}>{week.slice(4)}</Text>
    </View>
  );
}

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Your Progress</Text>

        {/* Streak */}
        <View style={styles.streakCard}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <View>
            <Text style={styles.streakCount}>5-day streak</Text>
            <Text style={styles.streakSub}>Personal best: 9 days</Text>
          </View>
          <View style={styles.totalSessions}>
            <Text style={styles.totalValue}>23</Text>
            <Text style={styles.totalLabel}>total sessions</Text>
          </View>
        </View>

        {/* Weekly Chart */}
        <Text style={styles.sectionTitle}>Weekly Completion</Text>
        <View style={styles.chartCard}>
          <View style={styles.chartLegend}>
            <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
            <Text style={styles.legendText}>Completed</Text>
            <View style={[styles.legendDot, { backgroundColor: Colors.border }]} />
            <Text style={styles.legendText}>Planned</Text>
          </View>
          <View style={styles.barsRow}>
            {WEEKLY_DATA.map((d) => (
              <WeekBar key={d.week} {...d} />
            ))}
          </View>
        </View>

        {/* Session History */}
        <Text style={styles.sectionTitle}>Session History</Text>
        {MOCK_HISTORY.map((log) => (
          <View key={log.id} style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyDate}>{log.date}</Text>
              <PawRating rating={log.pawRating} />
            </View>
            <Text style={styles.historyTitle}>{log.sessionTitle}</Text>
            <View style={styles.historyMeta}>
              <Text style={styles.historyProgram}>{log.program}</Text>
              <Text style={styles.historyStat}>⏱ {log.duration} min</Text>
              <Text style={styles.historyStat}>📝 {log.exercises} exercises</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  heading: { fontSize: FontSize.xxxl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.lg },

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
  totalSessions: { marginLeft: 'auto', alignItems: 'center' },
  totalValue: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.white },
  totalLabel: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.8)' },

  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },

  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  chartLegend: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginBottom: Spacing.md },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: FontSize.sm, color: Colors.textSecondary, marginRight: Spacing.sm },
  barsRow: { flexDirection: 'row', alignItems: 'flex-end', height: 80, gap: Spacing.xs },
  barContainer: { flex: 1, alignItems: 'center', gap: 4 },
  barTrack: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.border,
    borderRadius: Radius.sm,
    justifyContent: 'flex-end',
  },
  barFill: { backgroundColor: Colors.primary, borderRadius: Radius.sm, width: '100%' },
  barLabel: { fontSize: 9, color: Colors.textMuted },

  historyCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  historyDate: { fontSize: FontSize.sm, color: Colors.textMuted, fontWeight: '500' },
  historyTitle: { fontSize: FontSize.md, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  historyMeta: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  historyProgram: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: '600' },
  historyStat: { fontSize: FontSize.xs, color: Colors.textSecondary },
});
