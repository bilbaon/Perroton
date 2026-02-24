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

const PROGRAMS = [
  {
    id: 'puppy-basics',
    title: 'Puppy Basics',
    emoji: '🐶',
    level: 'Puppy',
    levelColor: '#FFB3BA',
    durationWeeks: 8,
    sessionsPerWeek: 3,
    description: 'The essential foundation every puppy needs — sit, name recognition, eye contact, leash intro, crate training, and bite inhibition.',
    skillOutcomes: ['Sit on cue', 'Name recall', 'Eye contact', 'Leash manners', 'Crate comfort'],
    tags: ['Foundation', 'Puppy', 'Socialization'],
  },
  {
    id: 'fundamental-skills',
    title: 'Fundamental Skills',
    emoji: '🎯',
    level: 'Beginner',
    levelColor: '#BAFFC9',
    durationWeeks: 12,
    sessionsPerWeek: 4,
    description: 'Build a solid obedience base: sit/stay, down, wait, heel, leave it, and reliable recall. The prerequisites for every advanced program.',
    skillOutcomes: ['Sit/Stay', 'Down/Stay', 'Heel', 'Leave it', 'Recall'],
    tags: ['Obedience', 'Beginner', 'Foundation'],
  },
  {
    id: 'impulse-control',
    title: 'Impulse Control',
    emoji: '🧘',
    level: 'Intermediate',
    levelColor: '#BAD4FF',
    durationWeeks: 6,
    sessionsPerWeek: 3,
    description: 'Teach your dog to pause before reacting. Extended stays, place command, threshold work, no-jumping, and polite food manners.',
    skillOutcomes: ['Extended stay', 'Place command', 'Threshold control', 'No jumping', 'Food bowl wait'],
    tags: ['Impulse Control', 'Manners', 'Intermediate'],
  },
  {
    id: 'urban-dog',
    title: 'Urban Dog',
    emoji: '🏙️',
    level: 'Intermediate',
    levelColor: '#BAD4FF',
    durationWeeks: 8,
    sessionsPerWeek: 3,
    description: 'Navigate city life with confidence. Elevators, crowds, traffic, cafe visits, and transit manners — prepare your dog for anything the city throws at them.',
    skillOutcomes: ['Elevator calm', 'Crowd focus', 'Traffic focus', 'Cafe settle', 'Transit manners'],
    tags: ['Urban', 'Distraction', 'Intermediate'],
  },
  {
    id: 'trail-outdoors',
    title: 'Trail & Outdoors',
    emoji: '🥾',
    level: 'Intermediate',
    levelColor: '#BAD4FF',
    durationWeeks: 6,
    sessionsPerWeek: 3,
    description: 'Make your dog the perfect adventure companion. Off-leash recall, wildlife distraction, trail etiquette, and outdoor confidence.',
    skillOutcomes: ['Off-leash recall', 'Wildlife focus', 'Trail etiquette', 'Water confidence', 'Camping calm'],
    tags: ['Outdoor', 'Off-leash', 'Adventure'],
  },
];

const LEVEL_ORDER = ['Puppy', 'Beginner', 'Intermediate'];

export default function ProgramsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Training Programs</Text>
        <Text style={styles.subheading}>
          Expert-designed plans for every stage of your dog's journey.
        </Text>

        {PROGRAMS.map((program) => (
          <TouchableOpacity
            key={program.id}
            style={styles.card}
            onPress={() => router.push(`/program/${program.id}`)}
            activeOpacity={0.85}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardEmoji}>{program.emoji}</Text>
              <View style={styles.cardMeta}>
                <Text style={styles.cardTitle}>{program.title}</Text>
                <View style={[styles.levelBadge, { backgroundColor: program.levelColor }]}>
                  <Text style={styles.levelText}>{program.level}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.cardDesc}>{program.description}</Text>
            <View style={styles.cardStats}>
              <Text style={styles.cardStat}>📅 {program.durationWeeks} weeks</Text>
              <Text style={styles.cardStat}>🔁 {program.sessionsPerWeek}x/week</Text>
            </View>
            <View style={styles.tagsRow}>
              {program.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  heading: { fontSize: FontSize.xxxl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.xs },
  subheading: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.lg },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, marginBottom: Spacing.sm },
  cardEmoji: { fontSize: 36 },
  cardMeta: { flex: 1, gap: 4 },
  cardTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.textPrimary },
  levelBadge: { alignSelf: 'flex-start', paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: Radius.full },
  levelText: { fontSize: FontSize.xs, fontWeight: '600', color: Colors.textPrimary },
  cardDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: Spacing.sm },
  cardStats: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.sm },
  cardStat: { fontSize: FontSize.sm, color: Colors.textSecondary },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  tag: { backgroundColor: Colors.card, paddingHorizontal: Spacing.sm, paddingVertical: 3, borderRadius: Radius.full },
  tagText: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: '500' },
});
