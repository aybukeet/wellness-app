import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from '@/src/constants/theme';
import { CATEGORIES, DAILY_RECOMMENDATION } from '@/src/data/categories';
import { INITIAL_TASKS } from '@/src/data/tasks';

type Mood = 'Enerjik' | 'Normal' | 'Yorgun';

const MOODS: { label: Mood; emoji: string; color: string; bg: string }[] = [
  { label: 'Enerjik', emoji: '⚡', color: '#9B7EC8', bg: '#EDE0F7' },
  { label: 'Normal', emoji: '😌', color: '#7DC8A0', bg: '#D4F0E4' },
  { label: 'Yorgun', emoji: '🌙', color: '#A8C4E0', bg: '#D4E8F7' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const completedTasks = INITIAL_TASKS.filter((t) => t.completed).length;
  const totalTasks = INITIAL_TASKS.length;
  const wellnessScore = Math.round((completedTasks / totalTasks) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredCategories = CATEGORIES.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Sağlık planın yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
              <Text style={styles.greeting}>Merhaba, Aybüke 👋</Text>
              <Text style={styles.date}>Perşembe, 19 Şub</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>🌸</Text>
          </View>
        </View>

        {/* Mood Selector */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Bugün nasıl hissediyorsun?</Text>
          <View style={styles.moodRow}>
            {MOODS.map((mood) => (
              <TouchableOpacity
                key={mood.label}
                style={[
                  styles.moodChip,
                  { borderColor: mood.color },
                  selectedMood === mood.label && { backgroundColor: mood.bg },
                ]}
                onPress={() => setSelectedMood(mood.label)}
                activeOpacity={0.8}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text
                  style={[
                    styles.moodLabel,
                    { color: selectedMood === mood.label ? mood.color : COLORS.textSecondary },
                  ]}
                >
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Weekly Wellness Score */}
        <View style={[styles.wellnessCard, SHADOW.medium]}>
          <View style={styles.wellnessHeader}>
            <View>
              <Text style={styles.wellnessTitle}>Weekly Wellness Score</Text>
              <Text style={styles.wellnessSub}>Keep it up, Sarah!</Text>
            </View>
            <Text style={styles.wellnessScore}>{wellnessScore}%</Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${wellnessScore}%` }]} />
          </View>
          <Text style={styles.wellnessNote}>
            {completedTasks} of {totalTasks} daily tasks completed
          </Text>
        </View>

        {/* Daily Recommendation */}
        <View style={[styles.recommendationCard, SHADOW.medium]}>
          <View style={styles.recBadge}>
            <Text style={styles.recBadgeText}>✨ Daily Recommendation</Text>
          </View>
          <View style={styles.recContent}>
            <View style={styles.recTextBlock}>
              <Text style={styles.recTitle}>{DAILY_RECOMMENDATION.title}</Text>
              <Text style={styles.recSubtitle} numberOfLines={2}>
                {DAILY_RECOMMENDATION.subtitle}
              </Text>
              <View style={styles.recMeta}>
                <View style={styles.recMetaChip}>
                  <Text style={styles.recMetaText}>⏱ {DAILY_RECOMMENDATION.duration}</Text>
                </View>
                <View style={[styles.recMetaChip, { backgroundColor: '#EDE0F7' }]}>
                  <Text style={[styles.recMetaText, { color: COLORS.primary }]}>
                    {DAILY_RECOMMENDATION.category}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.recEmoji}>{DAILY_RECOMMENDATION.icon}</Text>
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.categoriesTitle}>Explore Topics</Text>
        {filteredCategories.length === 0 ? (
          <View style={styles.emptySearch}>
            <Text style={styles.emptySearchText}>No categories found for "{searchQuery}"</Text>
          </View>
        ) : (
          <View style={styles.categoriesGrid}>
            {filteredCategories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, SHADOW.small, { borderLeftColor: cat.color }]}
                onPress={() => router.push(`/category/${cat.id}` as any)}
                activeOpacity={0.85}
              >
                <View style={[styles.categoryIconBg, { backgroundColor: cat.bgColor }]}>
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>{cat.title}</Text>
                  <Text style={styles.categoryCount}>{cat.articleCount} articles</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  loadingText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    ...FONT.regular,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: 26,
    ...FONT.bold,
    color: COLORS.textPrimary,
  },
  date: {
    fontSize: 13,
    ...FONT.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLighter,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.small,
  },
  sectionTitle: {
    fontSize: 14,
    ...FONT.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  moodRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  moodChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    backgroundColor: COLORS.surface,
    gap: 4,
  },
  moodEmoji: {
    fontSize: 20,
  },
  moodLabel: {
    fontSize: 11,
    ...FONT.medium,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    ...FONT.regular,
  },
  wellnessCard: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  wellnessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  wellnessTitle: {
    fontSize: 16,
    ...FONT.bold,
    color: COLORS.white,
  },
  wellnessSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    ...FONT.regular,
    marginTop: 2,
  },
  wellnessScore: {
    fontSize: 32,
    ...FONT.bold,
    color: COLORS.white,
  },
  progressBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
  },
  wellnessNote: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    ...FONT.regular,
  },
  recommendationCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryLighter,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
  },
  recBadgeText: {
    fontSize: 11,
    ...FONT.semibold,
    color: COLORS.primary,
  },
  recContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  recTextBlock: {
    flex: 1,
    gap: SPACING.xs,
  },
  recTitle: {
    fontSize: 16,
    ...FONT.bold,
    color: COLORS.textPrimary,
  },
  recSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    ...FONT.regular,
    lineHeight: 18,
  },
  recMeta: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: 4,
  },
  recMetaChip: {
    backgroundColor: COLORS.surfaceSecondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  recMetaText: {
    fontSize: 11,
    ...FONT.medium,
    color: COLORS.textSecondary,
  },
  recEmoji: {
    fontSize: 40,
  },
  categoriesTitle: {
    fontSize: 18,
    ...FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  categoriesGrid: {
    gap: SPACING.sm,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderLeftWidth: 4,
    gap: SPACING.md,
  },
  categoryIconBg: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 22,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 15,
    ...FONT.semibold,
    color: COLORS.textPrimary,
  },
  categoryCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
    ...FONT.regular,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.textMuted,
  },
  emptySearch: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptySearchText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    ...FONT.regular,
  },
});
