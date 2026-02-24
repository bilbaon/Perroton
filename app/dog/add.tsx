import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/theme';

const LEVELS = [
  { value: 'puppy', label: 'Puppy', emoji: '🐾', desc: 'Under 6 months, learning the basics' },
  { value: 'beginner', label: 'Beginner', emoji: '🎯', desc: 'Knows some basics, building consistency' },
  { value: 'intermediate', label: 'Intermediate', emoji: '🏅', desc: 'Solid foundation, ready for more' },
  { value: 'advanced', label: 'Advanced', emoji: '🏆', desc: 'Reliable commands, refining skills' },
] as const;

export default function AddDogScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [ageMonths, setAgeMonths] = useState('');
  const [weight, setWeight] = useState('');
  const [level, setLevel] = useState<string>('');

  const canContinue = name.trim() && breed.trim() && ageMonths && level;

  const handleSave = () => {
    // TODO: save to Supabase
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Add your dog 🐶</Text>
          <Text style={styles.subtitle}>Tell us about your pup so we can find the right program.</Text>

          {/* Photo Placeholder */}
          <TouchableOpacity style={styles.photoPicker}>
            <Text style={styles.photoEmoji}>📷</Text>
            <Text style={styles.photoText}>Add photo (optional)</Text>
          </TouchableOpacity>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Dog's name *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="e.g. Biscuit"
                placeholderTextColor={Colors.textMuted}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Breed *</Text>
              <TextInput
                style={styles.input}
                value={breed}
                onChangeText={setBreed}
                placeholder="e.g. Golden Retriever"
                placeholderTextColor={Colors.textMuted}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.row}>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={styles.label}>Age (months) *</Text>
                <TextInput
                  style={styles.input}
                  value={ageMonths}
                  onChangeText={setAgeMonths}
                  placeholder="5"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={styles.label}>Weight (lbs)</Text>
                <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="25"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.label}>Training level *</Text>
            {LEVELS.map((lvl) => (
              <TouchableOpacity
                key={lvl.value}
                style={[styles.levelOption, level === lvl.value && styles.levelOptionActive]}
                onPress={() => setLevel(lvl.value)}
              >
                <Text style={styles.levelEmoji}>{lvl.emoji}</Text>
                <View style={styles.levelInfo}>
                  <Text style={[styles.levelLabel, level === lvl.value && styles.levelLabelActive]}>
                    {lvl.label}
                  </Text>
                  <Text style={styles.levelDesc}>{lvl.desc}</Text>
                </View>
                {level === lvl.value && <Text style={styles.levelCheck}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.saveBtn, !canContinue && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={!canContinue}
          >
            <Text style={styles.saveBtnText}>Continue →</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  backBtn: { marginBottom: Spacing.lg },
  backText: { fontSize: FontSize.md, color: Colors.primary, fontWeight: '600' },

  title: { fontSize: FontSize.xxxl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.xs },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.lg },

  photoPicker: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.cardDark,
  },
  photoEmoji: { fontSize: 32, marginBottom: Spacing.xs },
  photoText: { fontSize: FontSize.md, color: Colors.textSecondary },

  form: { gap: Spacing.md, marginBottom: Spacing.lg },
  field: { gap: Spacing.xs },
  row: { flexDirection: 'row', gap: Spacing.sm },
  label: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.textPrimary },
  input: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 48,
  },

  levelOption: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadows.sm,
  },
  levelOptionActive: { borderColor: Colors.primary, backgroundColor: '#F0FAF7' },
  levelEmoji: { fontSize: 24 },
  levelInfo: { flex: 1 },
  levelLabel: { fontSize: FontSize.md, fontWeight: '600', color: Colors.textPrimary },
  levelLabelActive: { color: Colors.primary },
  levelDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  levelCheck: { fontSize: FontSize.lg, color: Colors.primary, fontWeight: '700' },

  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.md,
  },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.white },
});
