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

const PROGRAMS: Record<string, {
  title: string; emoji: string; level: string; levelColor: string;
  durationWeeks: number; sessionsPerWeek: number; description: string;
  skillOutcomes: string[]; tags: string[]; weeklyPreview: { week: number; title: string; focus: string }[];
}> = {
  'puppy-basics': {
    title: 'Puppy Basics',
    emoji: '🐶',
    level: 'Puppy',
    levelColor: '#FFB3BA',
    durationWeeks: 8,
    sessionsPerWeek: 3,
    description: 'The essential foundation every puppy needs. Designed by certified trainers for dogs under 6 months, this 8-week program covers the core skills that set your puppy up for a lifetime of good behavior.',
    skillOutcomes: ['Sit on cue', 'Name recall (>80% accuracy)', 'Eye contact on request', 'Loose-leash walking intro', 'Crate comfort and duration', 'Bite inhibition'],
    tags: ['Foundation', 'Puppy', 'Socialization'],
    weeklyPreview: [
      { week: 1, title: 'Name & Focus', focus: 'Name recognition, eye contact, sit foundation' },
      { week: 2, title: 'Sit & Stay', focus: 'Sit on cue, brief stay, leash intro' },
      { week: 3, title: 'Crate & Rest', focus: 'Crate comfort, settle, bite inhibition' },
      { week: 4, title: 'Leash Walks', focus: 'Loose leash, stop-and-go, heel intro' },
    ],
  },
  'fundamental-skills': {
    title: 'Fundamental Skills',
    emoji: '🎯',
    level: 'Beginner',
    levelColor: '#BAFFC9',
    durationWeeks: 12,
    sessionsPerWeek: 4,
    description: 'Build a rock-solid obedience foundation. This comprehensive 12-week program is the prerequisite for every advanced program, covering all core commands with progressive difficulty.',
    skillOutcomes: ['Sit/Stay (30s, 10ft)', 'Down/Stay', 'Reliable heel', 'Leave it with distractions', 'Recall from 20ft', 'Wait at thresholds'],
    tags: ['Obedience', 'Beginner', 'Foundation'],
    weeklyPreview: [
      { week: 1, title: 'Sit & Down Review', focus: 'Duration, distance, distraction intro' },
      { week: 2, title: 'Stay Foundation', focus: 'Duration stays, release cue clarity' },
      { week: 3, title: 'Heel Work', focus: 'Position, turns, pace changes' },
      { week: 4, title: 'Leave It & Recall', focus: 'Leave it proofing, recall games' },
    ],
  },
  'impulse-control': {
    title: 'Impulse Control',
    emoji: '🧘',
    level: 'Intermediate',
    levelColor: '#BAD4FF',
    durationWeeks: 6,
    sessionsPerWeek: 3,
    description: 'Teach your dog to think before acting. Perfect for dogs that are reactive to triggers, jump on guests, or struggle to settle. Six weeks of focused impulse-control work.',
    skillOutcomes: ['Extended stays (2+ min)', 'Place command', 'Threshold manners', 'No-jump greeting', 'Food bowl wait', 'Door manners'],
    tags: ['Impulse Control', 'Manners', 'Intermediate'],
    weeklyPreview: [
      { week: 1, title: 'Place Foundation', focus: 'Go to place, duration on platform' },
      { week: 2, title: 'Extended Stays', focus: 'Duration, distraction, duration+distraction' },
      { week: 3, title: 'Threshold Work', focus: 'Door manners, gate work, car exits' },
    ],
  },
  'urban-dog': {
    title: 'Urban Dog',
    emoji: '🏙️',
    level: 'Intermediate',
    levelColor: '#BAD4FF',
    durationWeeks: 8,
    sessionsPerWeek: 3,
    description: 'Turn your city dog into the ultimate urban companion. This real-world program trains in the environments that matter — elevators, patios, transit, and crowded sidewalks.',
    skillOutcomes: ['Elevator calm', 'Crowded street focus', 'Traffic desensitization', 'Café settle', 'Transit manners', 'Pedestrian passing'],
    tags: ['Urban', 'Distraction', 'Intermediate'],
    weeklyPreview: [
      { week: 1, title: 'Elevator & Lobby', focus: 'Entry/exit, small spaces, strangers' },
      { week: 2, title: 'Sidewalk Skills', focus: 'Pass-bys, cyclists, scooters' },
      { week: 3, title: 'Café Culture', focus: 'Settle under table, greet staff politely' },
    ],
  },
  'trail-outdoors': {
    title: 'Trail & Outdoors',
    emoji: '🥾',
    level: 'Intermediate',
    levelColor: '#BAD4FF',
    durationWeeks: 6,
    sessionsPerWeek: 3,
    description: 'Make your dog the perfect adventure companion. Off-leash reliability, wildlife proofing, and trail etiquette in a progressive 6-week outdoor program.',
    skillOutcomes: ['Off-leash recall (50ft)', 'Wildlife distraction focus', 'Trail passing manners', 'Water confidence', 'Camping settle', 'Check-in habit'],
    tags: ['Outdoor', 'Off-leash', 'Adventure'],
    weeklyPreview: [
      { week: 1, title: 'Check-In Habit', focus: 'Voluntary attention, long-line recall' },
      { week: 2, title: 'Off-Leash Foundation', focus: 'Recall proofing, emergency down' },
      { week: 3, title: 'Wildlife Distraction', focus: 'Squirrel, bird, and scent distraction work' },
    ],
  },
};

export default function ProgramDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const program = PROGRAMS[id ?? ''];

  if (!program) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>Program not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Header */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Programs</Text>
        </TouchableOpacity>

        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{program.emoji}</Text>
          <Text style={styles.heroTitle}>{program.title}</Text>
          <View style={[styles.levelBadge, { backgroundColor: program.levelColor }]}>
            <Text style={styles.levelText}>{program.level}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{program.durationWeeks}</Text>
            <Text style={styles.statLabel}>weeks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{program.sessionsPerWeek}x</Text>
            <Text style={styles.statLabel}>per week</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{program.durationWeeks * program.sessionsPerWeek}</Text>
            <Text style={styles.statLabel}>total sessions</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{program.description}</Text>

        {/* Skill Outcomes */}
        <Text style={styles.sectionTitle}>What Your Dog Will Learn</Text>
        <View style={styles.outcomesGrid}>
          {program.skillOutcomes.map((skill) => (
            <View key={skill} style={styles.outcomeChip}>
              <Text style={styles.outcomeTick}>✓</Text>
              <Text style={styles.outcomeText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* Weekly Preview */}
        <Text style={styles.sectionTitle}>Weekly Curriculum Preview</Text>
        {program.weeklyPreview.map((week) => (
          <View key={week.week} style={styles.weekCard}>
            <View style={styles.weekNum}>
              <Text style={styles.weekNumText}>W{week.week}</Text>
            </View>
            <View style={styles.weekInfo}>
              <Text style={styles.weekTitle}>{week.title}</Text>
              <Text style={styles.weekFocus}>{week.focus}</Text>
            </View>
          </View>
        ))}
        {program.durationWeeks > program.weeklyPreview.length && (
          <Text style={styles.moreWeeks}>
            + {program.durationWeeks - program.weeklyPreview.length} more weeks revealed as you progress
          </Text>
        )}

        {/* Enroll CTA */}
        <TouchableOpacity style={styles.enrollBtn}>
          <Text style={styles.enrollBtnText}>Enroll Biscuit in This Program</Text>
        </TouchableOpacity>
        <Text style={styles.enrollNote}>You can switch programs at any time. All logs are preserved.</Text>
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

  hero: { alignItems: 'center', marginBottom: Spacing.lg },
  heroEmoji: { fontSize: 64, marginBottom: Spacing.sm },
  heroTitle: { fontSize: FontSize.xxxl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.sm },
  levelBadge: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: Radius.full },
  levelText: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.textPrimary },

  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statValue: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.primary },
  statLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, textAlign: 'center' },

  description: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 24, marginBottom: Spacing.lg },

  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },

  outcomesGrid: { gap: Spacing.xs, marginBottom: Spacing.lg },
  outcomeChip: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.xs },
  outcomeTick: { fontSize: FontSize.md, color: Colors.success, fontWeight: '700' },
  outcomeText: { fontSize: FontSize.md, color: Colors.textPrimary },

  weekCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  weekNum: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekNumText: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.white },
  weekInfo: { flex: 1 },
  weekTitle: { fontSize: FontSize.md, fontWeight: '600', color: Colors.textPrimary },
  weekFocus: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  moreWeeks: { fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', marginBottom: Spacing.lg },

  enrollBtn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
    ...Shadows.md,
  },
  enrollBtnText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.white },
  enrollNote: { textAlign: 'center', fontSize: FontSize.xs, color: Colors.textMuted, marginTop: Spacing.sm },
});
