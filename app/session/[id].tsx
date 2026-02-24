import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/theme';

const MOCK_SESSION = {
  id: 'session-1',
  title: 'Sit, Name & Eye Contact',
  programTitle: 'Puppy Basics',
  week: 1,
  day: 1,
  durationMinutes: 15,
  exercises: [
    {
      id: 'ex-1',
      name: 'Name Recognition',
      description: 'Say your dog\'s name once in a happy tone. The moment they look at you, mark with "Yes!" and reward with a treat. Reset and repeat.',
      reps: 10,
      sets: 2,
      difficulty: 1,
      tips: [
        'Only say the name once — repeating it teaches them to ignore it',
        'Reward immediately when eyes meet yours',
        'Practice in a low-distraction environment first',
      ],
    },
    {
      id: 'ex-2',
      name: 'Sit Luring',
      description: 'Hold a treat at your dog\'s nose and slowly move it up and back over their head. As their nose goes up, their bottom goes down. Mark and reward the moment they sit.',
      reps: 8,
      sets: 3,
      difficulty: 1,
      tips: [
        'Don\'t push their bottom down — let the lure do the work',
        'Keep the treat close to their nose, not high in the air',
        'Fade the lure after 5–6 successful repetitions',
      ],
    },
    {
      id: 'ex-3',
      name: 'Eye Contact (Watch Me)',
      description: 'Hold a treat near your eye and wait. When your dog\'s gaze moves from the treat to your eyes, immediately mark and reward. Build duration to 3 seconds.',
      reps: 8,
      sets: 2,
      difficulty: 2,
      tips: [
        'Be patient — the dog will figure it out',
        'Even a glance counts at first; build duration gradually',
        'Name this "Watch" or "Eyes" once they understand it',
      ],
    },
    {
      id: 'ex-4',
      name: 'Hand Target',
      description: 'Present your flat palm 2–3 inches from your dog\'s nose. When they touch it with their nose, mark and reward. This becomes a powerful attention and recall tool.',
      reps: 10,
      sets: 2,
      difficulty: 1,
      tips: [
        'Present the hand at nose height, not above or below',
        'Don\'t move your hand toward them — let them choose to touch',
        'This exercise builds confidence and engagement',
      ],
    },
  ],
};

type ExerciseStatus = 'pending' | 'complete' | 'skipped';

export default function SessionWalkthroughScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<ExerciseStatus[]>(
    MOCK_SESSION.exercises.map(() => 'pending')
  );
  const [isComplete, setIsComplete] = useState(false);
  const [ratings, setRatings] = useState<number[]>(MOCK_SESSION.exercises.map(() => 0));

  const exercise = MOCK_SESSION.exercises[currentIndex];
  const progress = (currentIndex + 1) / MOCK_SESSION.exercises.length;

  const markDone = (rating: number) => {
    const next = [...statuses];
    next[currentIndex] = 'complete';
    setStatuses(next);
    const nextRatings = [...ratings];
    nextRatings[currentIndex] = rating;
    setRatings(nextRatings);
    if (currentIndex < MOCK_SESSION.exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const skipExercise = () => {
    const next = [...statuses];
    next[currentIndex] = 'skipped';
    setStatuses(next);
    if (currentIndex < MOCK_SESSION.exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    const done = statuses.filter((s) => s === 'complete').length;
    const avg = ratings.filter((r) => r > 0).reduce((a, b) => a + b, 0) / (ratings.filter((r) => r > 0).length || 1);
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeEmoji}>🎉</Text>
          <Text style={styles.completeTitle}>Session Complete!</Text>
          <Text style={styles.completeSubtitle}>
            {MOCK_SESSION.title}
          </Text>
          <View style={styles.completionStats}>
            <View style={styles.completeStat}>
              <Text style={styles.completeStatValue}>{done}/{MOCK_SESSION.exercises.length}</Text>
              <Text style={styles.completeStatLabel}>exercises done</Text>
            </View>
            <View style={styles.completeStat}>
              <Text style={styles.completeStatValue}>{MOCK_SESSION.durationMinutes} min</Text>
              <Text style={styles.completeStatLabel}>duration</Text>
            </View>
            <View style={styles.completeStat}>
              <Text style={styles.completeStatValue}>{avg.toFixed(1)} 🐾</Text>
              <Text style={styles.completeStatLabel}>avg rating</Text>
            </View>
          </View>
          <View style={styles.streakUpdate}>
            <Text style={styles.streakUpdateEmoji}>🔥</Text>
            <Text style={styles.streakUpdateText}>6 day streak! You're on a roll!</Text>
          </View>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.doneBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.exitText}>✕ Exit</Text>
          </TouchableOpacity>
          <Text style={styles.sessionMeta}>
            {MOCK_SESSION.programTitle} · W{MOCK_SESSION.week} D{MOCK_SESSION.day}
          </Text>
          <Text style={styles.exerciseCounter}>
            {currentIndex + 1} / {MOCK_SESSION.exercises.length}
          </Text>
        </View>

        {/* Exercise Dots */}
        <View style={styles.dots}>
          {MOCK_SESSION.exercises.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex && styles.dotActive,
                statuses[i] === 'complete' && styles.dotDone,
                statuses[i] === 'skipped' && styles.dotSkipped,
              ]}
            />
          ))}
        </View>

        {/* Exercise Card */}
        <View style={styles.exerciseCard}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <View style={styles.exerciseMeta}>
            {exercise.reps && (
              <View style={styles.metaChip}>
                <Text style={styles.metaChipText}>{exercise.sets} sets × {exercise.reps} reps</Text>
              </View>
            )}
            <View style={styles.diffChip}>
              <Text style={styles.diffChipText}>
                {'●'.repeat(exercise.difficulty)}{'○'.repeat(5 - exercise.difficulty)} Difficulty
              </Text>
            </View>
          </View>
          <Text style={styles.exerciseDesc}>{exercise.description}</Text>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Trainer Tips</Text>
          {exercise.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Rating */}
        <Text style={styles.ratingLabel}>How did it go?</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.ratingBtn, ratings[currentIndex] === r && styles.ratingBtnActive]}
              onPress={() => markDone(r)}
            >
              <Text style={styles.ratingBtnText}>🐾</Text>
              <Text style={[styles.ratingNum, ratings[currentIndex] === r && styles.ratingNumActive]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.skipBtn} onPress={skipExercise}>
          <Text style={styles.skipBtnText}>Skip exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  progressBar: { height: 4, backgroundColor: Colors.border },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 2 },
  scroll: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  exitText: { fontSize: FontSize.md, color: Colors.textSecondary, fontWeight: '600' },
  sessionMeta: { fontSize: FontSize.xs, color: Colors.textMuted },
  exerciseCounter: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.textSecondary },

  dots: { flexDirection: 'row', gap: Spacing.xs, marginBottom: Spacing.lg, justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border },
  dotActive: { backgroundColor: Colors.primary, width: 24 },
  dotDone: { backgroundColor: Colors.success },
  dotSkipped: { backgroundColor: Colors.textMuted },

  exerciseCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  exerciseName: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.sm },
  exerciseMeta: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md, flexWrap: 'wrap' },
  metaChip: { backgroundColor: Colors.card, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.full },
  metaChipText: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.primary },
  diffChip: { backgroundColor: Colors.background, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.full },
  diffChipText: { fontSize: FontSize.xs, color: Colors.textMuted },
  exerciseDesc: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 24 },

  tipsCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  tipsTitle: { fontSize: FontSize.md, fontWeight: '700', color: Colors.primary, marginBottom: Spacing.sm },
  tipRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.xs },
  tipBullet: { fontSize: FontSize.md, color: Colors.primary, lineHeight: 22 },
  tipText: { flex: 1, fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 22 },

  ratingLabel: { fontSize: FontSize.md, fontWeight: '600', color: Colors.textPrimary, marginBottom: Spacing.sm, textAlign: 'center' },
  ratingRow: { flexDirection: 'row', gap: Spacing.sm, justifyContent: 'center', marginBottom: Spacing.md },
  ratingBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadows.sm,
  },
  ratingBtnActive: { borderColor: Colors.accent, backgroundColor: '#FFF8ED' },
  ratingBtnText: { fontSize: 20 },
  ratingNum: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.textMuted, marginTop: 2 },
  ratingNumActive: { color: Colors.accent },

  skipBtn: { padding: Spacing.md, alignItems: 'center' },
  skipBtnText: { fontSize: FontSize.sm, color: Colors.textMuted },

  // Completion screen
  completeContainer: { flex: 1, padding: Spacing.lg, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  completeEmoji: { fontSize: 72 },
  completeTitle: { fontSize: FontSize.xxxl, fontWeight: '800', color: Colors.textPrimary },
  completeSubtitle: { fontSize: FontSize.md, color: Colors.textSecondary },
  completionStats: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.md },
  completeStat: { flex: 1, backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center' },
  completeStatValue: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.primary },
  completeStatLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, textAlign: 'center', marginTop: 2 },
  streakUpdate: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.primary, borderRadius: Radius.lg, padding: Spacing.md, width: '100%' },
  streakUpdateEmoji: { fontSize: 28 },
  streakUpdateText: { fontSize: FontSize.md, fontWeight: '700', color: Colors.white, flex: 1 },
  doneBtn: { backgroundColor: Colors.primary, borderRadius: Radius.lg, padding: Spacing.md, alignItems: 'center', width: '100%', ...Shadows.md },
  doneBtnText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.white },
});
