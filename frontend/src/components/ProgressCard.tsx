import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from '../constants/theme';

type ProgressCardProps = {
  label: string;
  percentage: number;
  completed: number;
  total: number;
  color?: string;
  bgColor?: string;
};

export function ProgressCard({
  label,
  percentage,
  completed,
  total,
  color = COLORS.primary,
  bgColor = COLORS.primaryLighter,
}: ProgressCardProps) {
  return (
    <View style={[styles.card, SHADOW.medium]}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.percentage, { color }]}>{percentage}%</Text>
      </View>
      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            { width: `${percentage}%` as any, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.subtitle}>
        {completed} of {total} completed
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    ...FONT.semibold,
    color: COLORS.textPrimary,
  },
  percentage: {
    fontSize: 20,
    ...FONT.bold,
  },
  barBg: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: RADIUS.full,
  },
  subtitle: {
    fontSize: 12,
    ...FONT.regular,
    color: COLORS.textSecondary,
  },
});
