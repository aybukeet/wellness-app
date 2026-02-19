import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from '@/src/constants/theme';
import { LESSONS, Lesson, LessonStatus } from '@/src/data/lessons';
import { EmptyState } from '@/src/components/EmptyState';

const STATUS_CONFIG: Record<LessonStatus, { label: string; color: string; bg: string }> = {
  completed: { label: 'Completed', color: '#7DC8A0', bg: '#D4F0E4' },
  'in-progress': { label: 'In Progress', color: '#9B7EC8', bg: '#EDE0F7' },
  'not-started': { label: 'Not Started', color: '#B0A0C8', bg: '#F4EEF9' },
};

export default function LessonsScreen() {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>(LESSONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const completed = lessons.filter((l) => l.status === 'completed').length;
  const inProgress = lessons.filter((l) => l.status === 'in-progress').length;
  const total = lessons.length;
  const weekProgress = Math.round((completed / total) * 100);

  const markCompleted = (id: string) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: 'completed' as LessonStatus } : l
      )
    );
  };

  const renderLesson = ({ item }: { item: Lesson }) => {
    const statusConfig = STATUS_CONFIG[item.status];
    return (
      <TouchableOpacity
        style={[styles.lessonCard, SHADOW.small]}
        onPress={() => router.push(`/lesson/${item.id}` as any)}
        activeOpacity={0.85}
      >
        <View style={[styles.thumbnail, { backgroundColor: item.categoryBg }]}>
          <Text style={styles.thumbnailEmoji}>{item.thumbnail}</Text>
          {item.status === 'completed' && (
            <View style={styles.completedOverlay}>
              <Text style={styles.completedCheck}>✓</Text>
            </View>
          )}
        </View>
        <View style={styles.lessonContent}>
          <View style={styles.lessonMeta}>
            <View style={[styles.categoryTag, { backgroundColor: item.categoryBg }]}>
              <Text style={[styles.categoryTagText, { color: item.categoryColor }]}>
                {item.category}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
              <Text style={[styles.statusText, { color: statusConfig.color }]}>
                {statusConfig.label}
              </Text>
            </View>
          </View>
          <Text style={styles.lessonTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.lessonFooter}>
            <Text style={styles.duration}>⏱ {item.duration}</Text>
            {item.status !== 'completed' && (
              <TouchableOpacity
                style={styles.markBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  markCompleted(item.id);
                }}
              >
                <Text style={styles.markBtnText}>Mark done</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading lessons...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLesson}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.screenTitle}>Lessons</Text>
              <Text style={styles.screenSubtitle}>Your wellness curriculum</Text>
            </View>

            {/* Progress Card */}
            <View style={[styles.progressCard, SHADOW.medium]}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Weekly Progress</Text>
                <Text style={styles.progressPct}>{weekProgress}%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${weekProgress}%` }]} />
              </View>
              <View style={styles.progressStats}>
                <View style={styles.stat}>
                  <Text style={styles.statNum}>{completed}</Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={[styles.statNum, { color: COLORS.primary }]}>{inProgress}</Text>
                  <Text style={styles.statLabel}>In Progress</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statNum}>{total - completed - inProgress}</Text>
                  <Text style={styles.statLabel}>Upcoming</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>All Lessons</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="📚"
            title="No lessons yet"
            subtitle="Your personalized lessons will appear here."
          />
        }
      />
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
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  header: {
    paddingTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  screenTitle: {
    fontSize: 28,
    ...FONT.bold,
    color: COLORS.textPrimary,
  },
  screenSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    ...FONT.regular,
    marginTop: 2,
  },
  progressCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  progressTitle: {
    fontSize: 16,
    ...FONT.semibold,
    color: COLORS.textPrimary,
  },
  progressPct: {
    fontSize: 24,
    ...FONT.bold,
    color: COLORS.primary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    gap: 2,
  },
  statNum: {
    fontSize: 20,
    ...FONT.bold,
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    ...FONT.regular,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 18,
    ...FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  lessonCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 88,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  thumbnailEmoji: {
    fontSize: 32,
  },
  completedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(125, 200, 160, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedCheck: {
    fontSize: 24,
    color: COLORS.white,
    ...FONT.bold,
  },
  lessonContent: {
    flex: 1,
    padding: SPACING.md,
    gap: SPACING.xs,
  },
  lessonMeta: {
    flexDirection: 'row',
    gap: SPACING.xs,
    flexWrap: 'wrap',
  },
  categoryTag: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  categoryTagText: {
    fontSize: 10,
    ...FONT.semibold,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  statusText: {
    fontSize: 10,
    ...FONT.medium,
  },
  lessonTitle: {
    fontSize: 14,
    ...FONT.semibold,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  lessonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  duration: {
    fontSize: 12,
    color: COLORS.textSecondary,
    ...FONT.regular,
  },
  markBtn: {
    backgroundColor: COLORS.primaryLighter,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  markBtnText: {
    fontSize: 11,
    ...FONT.medium,
    color: COLORS.primary,
  },
});
