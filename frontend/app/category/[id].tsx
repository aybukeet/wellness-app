import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from '@/src/constants/theme';
import { CATEGORIES } from '@/src/data/categories';
import { LESSONS } from '@/src/data/lessons';
import { EmptyState } from '@/src/components/EmptyState';

const ARTICLES = [
  { id: 'a1', title: 'The Science of Hormonal Balance', readTime: '8 min read', tag: 'sleep-fertility' },
  { id: 'a2', title: 'How Sleep Quality Affects Fertility', readTime: '6 min read', tag: 'sleep-fertility' },
  { id: 'a3', title: 'Understanding Your Cycle Phases', readTime: '10 min read', tag: 'sleep-fertility' },
  { id: 'a4', title: 'Anti-Inflammatory Foods for Hormones', readTime: '7 min read', tag: 'nutrition' },
  { id: 'a5', title: 'Cycle Syncing Your Diet', readTime: '9 min read', tag: 'nutrition' },
  { id: 'a6', title: 'Iron-Rich Foods for Menstrual Health', readTime: '5 min read', tag: 'nutrition' },
  { id: 'a7', title: 'Best Exercises for Each Cycle Phase', readTime: '8 min read', tag: 'physical-activity' },
  { id: 'a8', title: 'Yoga for Hormonal Balance', readTime: '6 min read', tag: 'physical-activity' },
  { id: 'a9', title: 'Building a Morning Wellness Routine', readTime: '7 min read', tag: 'healthy-habits' },
  { id: 'a10', title: 'Journaling for Emotional Health', readTime: '5 min read', tag: 'healthy-habits' },
];

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const category = CATEGORIES.find((c) => c.id === id);
  const relatedLessons = LESSONS.filter(
    (l) => l.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === id ||
    l.categoryColor === category?.color
  ).slice(0, 3);
  const articles = ARTICLES.filter((a) => a.tag === id);

  if (!category) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState title="Category not found" subtitle="This category does not exist." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={[styles.headerBg, { backgroundColor: category.bgColor }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backArrow, { color: category.color }]}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={[styles.iconBg, { backgroundColor: category.color + '30' }]}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
          </View>
          <Text style={[styles.categoryTitle, { color: category.color }]}>{category.title}</Text>
          <Text style={styles.articleCount}>{category.articleCount} articles available</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <View style={[styles.descCard, SHADOW.small]}>
          <Text style={styles.descText}>{category.description}</Text>
        </View>

        {/* Related Lessons */}
        {relatedLessons.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Related Lessons</Text>
            {relatedLessons.map((lesson) => (
              <TouchableOpacity
                key={lesson.id}
                style={[styles.lessonCard, SHADOW.small]}
                onPress={() => router.push(`/lesson/${lesson.id}` as any)}
                activeOpacity={0.85}
              >
                <View style={[styles.lessonThumb, { backgroundColor: lesson.categoryBg }]}>
                  <Text style={styles.lessonEmoji}>{lesson.thumbnail}</Text>
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle} numberOfLines={2}>{lesson.title}</Text>
                  <Text style={styles.lessonDuration}>⏱ {lesson.duration}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Articles */}
        {articles.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Articles</Text>
            {articles.map((article, idx) => (
              <View key={article.id} style={[styles.articleCard, SHADOW.small]}>
                <View style={[styles.articleNum, { backgroundColor: category.bgColor }]}>
                  <Text style={[styles.articleNumText, { color: category.color }]}>{idx + 1}</Text>
                </View>
                <View style={styles.articleInfo}>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                  <Text style={styles.articleMeta}>📖 {article.readTime}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {articles.length === 0 && relatedLessons.length === 0 && (
          <EmptyState
            icon={category.icon}
            title="Content coming soon"
            subtitle="We're working on adding more content to this category."
          />
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
  headerBg: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingRight: SPACING.md,
  },
  backArrow: {
    fontSize: 32,
    lineHeight: 32,
    ...FONT.bold,
  },
  headerContent: {
    alignItems: 'center',
    gap: SPACING.sm,
    paddingTop: SPACING.sm,
  },
  iconBg: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 36,
  },
  categoryTitle: {
    fontSize: 24,
    ...FONT.bold,
    textAlign: 'center',
  },
  articleCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
    ...FONT.regular,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  descCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  descText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    ...FONT.regular,
    lineHeight: 22,
  },
  section: {
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 17,
    ...FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  lessonThumb: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonEmoji: {
    fontSize: 24,
  },
  lessonInfo: {
    flex: 1,
    gap: 4,
  },
  lessonTitle: {
    fontSize: 14,
    ...FONT.semibold,
    color: COLORS.textPrimary,
  },
  lessonDuration: {
    fontSize: 12,
    color: COLORS.textSecondary,
    ...FONT.regular,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.textMuted,
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  articleNum: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleNumText: {
    fontSize: 14,
    ...FONT.bold,
  },
  articleInfo: {
    flex: 1,
    gap: 4,
  },
  articleTitle: {
    fontSize: 14,
    ...FONT.semibold,
    color: COLORS.textPrimary,
  },
  articleMeta: {
    fontSize: 12,
    color: COLORS.textSecondary,
    ...FONT.regular,
  },
});
