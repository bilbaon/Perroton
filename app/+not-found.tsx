import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSize, Spacing } from '@/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🐾</Text>
      <Text style={styles.title}>Page not found</Text>
      <Text style={styles.sub}>This screen doesn't exist.</Text>
      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.btnText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background, padding: Spacing.lg },
  emoji: { fontSize: 64, marginBottom: Spacing.md },
  title: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.xs },
  sub: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.xl },
  btn: { backgroundColor: Colors.primary, borderRadius: 12, padding: Spacing.md, paddingHorizontal: Spacing.xl },
  btnText: { fontSize: FontSize.md, fontWeight: '700', color: Colors.white },
});
