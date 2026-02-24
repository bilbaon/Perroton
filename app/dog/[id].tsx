import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/theme';

const MOCK_DOGS: Record<string, {
  name: string; breed: string; ageMonths: number; emoji: string;
  program: string; streak: number; totalSessions: number; level: string;
  weightLbs: number;
}> = {
  'dog-1': {
    name: 'Biscuit',
    breed: 'Golden Retriever',
    ageMonths: 5,
    emoji: '🐕',
    program: 'Puppy Basics',
    streak: 5,
    totalSessions: 23,
    level: 'Puppy',
    weightLbs: 22,
  },
  'dog-2': {
    name: 'Pepper',
    breed: 'Border Collie',
    ageMonths: 18,
    emoji: '🐩',
    program: 'Impulse Control',
    streak: 2,
    totalSessions: 47,
    level: 'Intermediate',
    weightLbs: 38,
  },
};

export default function DogProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dog = MOCK_DOGS[id ?? ''];

  if (!dog) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>Dog not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Profile</Text>
        </TouchableOpacity>

        {/* Dog Header */}
        <View style={styles.dogHeader}>
          <View style={styles.dogAvatar}>
            <Text style={{ fontSize: 64 }}>{dog.emoji}</Text>
          </View>
          <Text style={styles.dogName}>{dog.name}</Text>
          <Text style={styles.dogBreed}>{dog.breed}</Text>
          <View style={styles.dogMeta}>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>{dog.ageMonths} months</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>{dog.weightLbs} lbs</Text>
            </View>
            <View style={[styles.metaChip, styles.levelChip]}>
              <Text style={[styles.metaChipText, styles.levelChipText]}>{dog.level}</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>{dog.streak}</Text>
            <Text style={styles.statLabel}>day streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📋</Text>
            <Text style={styles.statValue}>{dog.totalSessions}</Text>
            <Text style={styles.statLabel}>sessions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statValue}>4.2</Text>
            <Text style={styles.statLabel}>avg rating</Text>
          </View>
        </View>

        {/* Current Program */}
        <Text style={styles.sectionTitle}>Current Program</Text>
        <View style={styles.programCard}>
          <View style={styles.programInfo}>
            <Text style={styles.programTitle}>{dog.program}</Text>
            <Text style={styles.programProgress}>Week 1 of 8 · Day 3</Text>
          </View>
          <View style={styles.programProgressBar}>
            <View style={[styles.programProgressFill, { width: '12%' }]} />
          </View>
          <Text style={styles.programPct}>12% complete</Text>
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>✏️  Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>🔄  Switch Program</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.dangerBtn]}>
          <Text style={styles.dangerBtnText}>🗑️  Remove Dog</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  notFound: { padding: Spacing.lg, fontSize: FontSize.lg, color: Colors.textSecondary },

  backBtn: { marginBottom: Spacing.lg },
  backText: { fontSize: FontSize.md, color: Colors.primary, fontWeight: '600' },

  dogHeader: { alignItems: 'center', marginBottom: Spacing.lg },
  dogAvatar: {
    width: 100,
    height: 100,
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  dogName: { fontSize: FontSize.xxxl, fontWeight: '800', color: Colors.textPrimary },
  dogBreed: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: 4 },
  dogMeta: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  metaChip: { backgroundColor: Colors.card, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: Radius.full },
  metaChipText: { fontSize: FontSize.sm, fontWeight: '500', color: Colors.textSecondary },
  levelChip: { backgroundColor: Colors.primary },
  levelChipText: { color: Colors.white, fontWeight: '700' },

  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  statEmoji: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: FontSize.xs, color: Colors.textMuted, textAlign: 'center' },

  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },
  programCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  programInfo: { marginBottom: Spacing.sm },
  programTitle: { fontSize: FontSize.md, fontWeight: '700', color: Colors.textPrimary },
  programProgress: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  programProgressBar: { height: 8, backgroundColor: Colors.border, borderRadius: Radius.full, overflow: 'hidden', marginBottom: 4 },
  programProgressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: Radius.full },
  programPct: { fontSize: FontSize.xs, color: Colors.textMuted },

  actionBtn: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  actionBtnText: { fontSize: FontSize.md, fontWeight: '500', color: Colors.textPrimary },
  dangerBtn: { backgroundColor: '#FFF5F5' },
  dangerBtnText: { fontSize: FontSize.md, fontWeight: '500', color: Colors.error },
});
