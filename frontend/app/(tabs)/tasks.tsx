import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from '@/src/constants/theme';
import { INITIAL_TASKS, Task } from '@/src/data/tasks';
import { EmptyState } from '@/src/components/EmptyState';

const CATEGORY_OPTIONS = ['Nutrition', 'Physical Activity', 'Healthy Habits', 'Sleep & Fertility'];
const ICON_OPTIONS = ['💧', '🏃‍♀️', '🧘‍♀️', '💊', '🌙', '📔', '🥦', '🤸‍♀️', '🍎', '💤'];
const ICON_BGS: Record<string, string> = {
  '💧': '#D4E8F7',
  '🏃‍♀️': '#FCE4EE',
  '🧘‍♀️': '#EDE0F7',
  '💊': '#D4F0E4',
  '🌙': '#EDE0F7',
  '📔': '#FEF4C0',
  '🥦': '#D4F0E4',
  '🤸‍♀️': '#FCE4EE',
  '🍎': '#FCE4EE',
  '💤': '#D4E8F7',
};

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(CATEGORY_OPTIONS[0]);
  const [newIcon, setNewIcon] = useState(ICON_OPTIONS[0]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = () => {
    if (!newTitle.trim()) return;
    const task: Task = {
      id: `t${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      icon: newIcon,
      iconBg: ICON_BGS[newIcon] || COLORS.primaryLighter,
      completed: false,
    };
    setTasks((prev) => [...prev, task]);
    setNewTitle('');
    setNewCategory(CATEGORY_OPTIONS[0]);
    setNewIcon(ICON_OPTIONS[0]);
    setShowAddTask(false);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={[styles.taskCard, SHADOW.small, item.completed && styles.taskCardCompleted]}
      onPress={() => toggleTask(item.id)}
      activeOpacity={0.85}
    >
      <View style={[styles.taskIcon, { backgroundColor: item.iconBg }]}>
        <Text style={styles.taskIconEmoji}>{item.icon}</Text>
      </View>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, item.completed && styles.taskTitleDone]}>
          {item.title}
        </Text>
        <View style={styles.taskCategoryRow}>
          <View style={styles.categoryDot} />
          <Text style={styles.taskCategory}>{item.category}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxFilled]}
        onPress={() => toggleTask(item.id)}
      >
        {item.completed && <Text style={styles.checkMark}>✓</Text>}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.screenTitle}>Daily Tasks</Text>
              <Text style={styles.screenSubtitle}>Stay consistent with your wellness goals</Text>
            </View>

            {/* Progress Card */}
            <View style={[styles.progressCard, SHADOW.medium]}>
              <View style={styles.progressTop}>
                <View>
                  <Text style={styles.progressLabel}>Weekly Progress</Text>
                  <Text style={styles.progressSub}>
                    {completedCount} of {totalCount} tasks done
                  </Text>
                </View>
                <View style={styles.progressCircle}>
                  <Text style={styles.progressPct}>{progress}%</Text>
                </View>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${progress}%` },
                  ]}
                />
              </View>
              <View style={styles.progressChips}>
                <View style={styles.progressChip}>
                  <Text style={styles.chipNum}>{completedCount}</Text>
                  <Text style={styles.chipLabel}>Done ✅</Text>
                </View>
                <View style={styles.progressChip}>
                  <Text style={[styles.chipNum, { color: COLORS.primary }]}>
                    {totalCount - completedCount}
                  </Text>
                  <Text style={styles.chipLabel}>Remaining</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Your Tasks</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="✅"
            title="No tasks yet"
            subtitle="Add your first daily wellness task!"
          />
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, SHADOW.medium]}
        onPress={() => setShowAddTask(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Add Task Modal */}
      <Modal
        visible={showAddTask}
        animationType="slide"
        transparent
        onRequestClose={() => setShowAddTask(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Add New Task</Text>

            <Text style={styles.fieldLabel}>Task name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Drink 8 glasses of water"
              placeholderTextColor={COLORS.textMuted}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.optionsGrid}>
              {CATEGORY_OPTIONS.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.optionChip,
                    newCategory === cat && styles.optionChipActive,
                  ]}
                  onPress={() => setNewCategory(cat)}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      newCategory === cat && styles.optionChipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Icon</Text>
            <View style={styles.iconsRow}>
              {ICON_OPTIONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconOption,
                    { backgroundColor: ICON_BGS[icon] || COLORS.primaryLighter },
                    newIcon === icon && styles.iconOptionActive,
                  ]}
                  onPress={() => setNewIcon(icon)}
                >
                  <Text style={styles.iconEmoji}>{icon}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setShowAddTask(false);
                  setNewTitle('');
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addBtn, !newTitle.trim() && styles.addBtnDisabled]}
                onPress={addTask}
                disabled={!newTitle.trim()}
              >
                <Text style={styles.addBtnText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 100,
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
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 16,
    ...FONT.bold,
    color: COLORS.white,
  },
  progressSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    ...FONT.regular,
    marginTop: 2,
  },
  progressCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPct: {
    fontSize: 18,
    ...FONT.bold,
    color: COLORS.white,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
  },
  progressChips: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  progressChip: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    gap: 2,
  },
  chipNum: {
    fontSize: 18,
    ...FONT.bold,
    color: COLORS.white,
  },
  chipLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    ...FONT.regular,
  },
  sectionTitle: {
    fontSize: 18,
    ...FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
  },
  taskCardCompleted: {
    opacity: 0.7,
  },
  taskIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskIconEmoji: {
    fontSize: 22,
  },
  taskInfo: {
    flex: 1,
    gap: 4,
  },
  taskTitle: {
    fontSize: 14,
    ...FONT.semibold,
    color: COLORS.textPrimary,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  taskCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primaryLight,
  },
  taskCategory: {
    fontSize: 12,
    color: COLORS.textSecondary,
    ...FONT.regular,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxFilled: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkMark: {
    fontSize: 13,
    color: COLORS.white,
    ...FONT.bold,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    fontSize: 28,
    color: COLORS.white,
    lineHeight: 30,
    marginBottom: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.full,
    alignSelf: 'center',
    marginBottom: SPACING.xs,
  },
  modalTitle: {
    fontSize: 18,
    ...FONT.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  fieldLabel: {
    fontSize: 13,
    ...FONT.semibold,
    color: COLORS.textSecondary,
    marginBottom: -SPACING.xs,
  },
  textInput: {
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    fontSize: 14,
    color: COLORS.textPrimary,
    ...FONT.regular,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  optionChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionChipActive: {
    backgroundColor: COLORS.primaryLighter,
    borderColor: COLORS.primary,
  },
  optionChipText: {
    fontSize: 12,
    ...FONT.medium,
    color: COLORS.textSecondary,
  },
  optionChipTextActive: {
    color: COLORS.primary,
  },
  iconsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  iconOption: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconOptionActive: {
    borderColor: COLORS.primary,
  },
  iconEmoji: {
    fontSize: 22,
  },
  modalActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSecondary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelBtnText: {
    fontSize: 15,
    ...FONT.semibold,
    color: COLORS.textSecondary,
  },
  addBtn: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  addBtnDisabled: {
    backgroundColor: COLORS.primaryLight,
  },
  addBtnText: {
    fontSize: 15,
    ...FONT.bold,
    color: COLORS.white,
  },
});
