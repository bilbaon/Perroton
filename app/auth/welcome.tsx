import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🐾</Text>
          <Text style={styles.title}>PawProgress</Text>
          <Text style={styles.tagline}>
            The training app your dog deserves.{'\n'}
            Structured programs. Daily sessions.{'\n'}
            Real progress.
          </Text>
        </View>

        <View style={styles.features}>
          {[
            { emoji: '📋', text: 'Expert-designed training programs' },
            { emoji: '🔥', text: 'Daily sessions with streak tracking' },
            { emoji: '🐕', text: 'Manage multiple dogs from one app' },
          ].map(({ emoji, text }) => (
            <View key={text} style={styles.featureRow}>
              <Text style={styles.featureEmoji}>{emoji}</Text>
              <Text style={styles.featureText}>{text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push('/auth/signup')}
          >
            <Text style={styles.primaryBtnText}>Get Started Free</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.secondaryBtnText}>I already have an account</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.disclaimer}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.lg, justifyContent: 'space-between' },

  hero: { alignItems: 'center', paddingTop: Spacing.xxl },
  heroEmoji: { fontSize: 72, marginBottom: Spacing.md },
  title: { fontSize: 40, fontWeight: '800', color: Colors.primary, marginBottom: Spacing.md },
  tagline: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },

  features: { gap: Spacing.md },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  featureEmoji: { fontSize: 24 },
  featureText: { fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: '500', flex: 1 },

  actions: { gap: Spacing.sm },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.md,
  },
  primaryBtnText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.white },
  secondaryBtn: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  secondaryBtnText: { fontSize: FontSize.md, color: Colors.primary, fontWeight: '600' },

  disclaimer: { textAlign: 'center', fontSize: FontSize.xs, color: Colors.textMuted },
});
