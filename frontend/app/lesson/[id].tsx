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
import { LESSONS, LessonStatus } from '@/src/data/lessons';
import { EmptyState } from '@/src/components/EmptyState';

const STATUS_CONFIG: Record<LessonStatus, { label: string; color: string; bg: string }> = {
  completed: { label: 'Completed', color: '#7DC8A0', bg: '#D4F0E4' },
  'in-progress': { label: 'In Progress', color: '#9B7EC8', bg: '#EDE0F7' },
  'not-started': { label: 'Not Started', color: '#B0A0C8', bg: '#F4EEF9' },
};

const LESSON_STEPS = [
  'Introduction to the topic',
  'Core concepts and science',
  'Practical application',
  'Daily integration tips',
  'Summary and key takeaways',
];

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = LESSONS.find((l) => l.id === id);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState title="Lesson not found" subtitle="This lesson does not exist." />
      </SafeAreaView>
    );
  }

  const statusConfig = STATUS_CONFIG[lesson.status];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: lesson.categoryBg }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backArrow, { color: lesson.categoryColor }]}>‹</Text>
        </TouchableOpacity>
        <View style={styles.heroContent}>
          <Text style={styles.heroEmoji}>{lesson.thumbnail}</Text>
          <View style={styles.heroBadges}>
            <View style={[styles.badge, { backgroundColor: lesson.categoryColor + '25' }]}>
              <Text style={[styles.badgeText, { color: lesson.categoryColor }]}>
                {lesson.category}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: statusConfig.bg }]}>
              <Text style={[styles.badgeText, { color: statusConfig.color }]}>
                {statusConfig.label}
              </Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>{lesson.title}</Text>
          <Text style={styles.heroDuration}>⏱ {lesson.duration} · Week {lesson.weekNumber}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <View style={[styles.card, SHADOW.small]}>
          <Text style={styles.cardTitle}>About this Lesson</Text>
          <Text style={styles.cardText}>{lesson.description}</Text>
        </View>

        {/* Lesson Steps */}
        <View style={[styles.card, SHADOW.small]}>
          <Text style={styles.cardTitle}>What you will learn</Text>
          {LESSON_STEPS.map((step, idx) => (
            <View key={idx} style={styles.step}>
              <View style={[styles.stepNum, { backgroundColor: lesson.categoryBg }]}>
                <Text style={[styles.stepNumText, { color: lesson.categoryColor }]}>
                  {idx + 1}
                </Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.startBtn, { backgroundColor: lesson.categoryColor }]}
          activeOpacity={0.85}
        >
          <Text style={styles.startBtnText}>
            {lesson.status === 'completed' ? 'Review Lesson' : 'Start Lesson'}
          </Text>
        </TouchableOpacity>

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
  hero: {
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
  heroContent: {
    alignItems: 'center',
    gap: SPACING.sm,
    paddingTop: SPACING.sm,
  },
  heroEmoji: {
    fontSize: 56,
  },
  heroBadges: {
    flexDirection: 'row',
    gap: SPACING.xs,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  badgeText: {
    fontSize: 12,
    ...FONT.semibold,
  },
  heroTitle: {
    fontSize: 22,
    ...FONT.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 30,
  },
  heroDuration: {
    fontSize: 13,
    color: COLORS.textSecondary,
    ...FONT.regular,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  cardTitle: {
    fontSize: 16,
    ...FONT.bold,
    color: COLORS.textPrimary,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    ...FONT.regular,
    lineHeight: 22,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  stepNum: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    fontSize: 14,
    ...FONT.bold,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    ...FONT.regular,
  },
  startBtn: {
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  startBtnText: {
    fontSize: 16,
    ...FONT.bold,
    color: COLORS.white,
  },
});
