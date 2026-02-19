import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from '@/src/constants/theme';
import { POSTS, Comment, PostFilter } from '@/src/data/community';
import { EmptyState } from '@/src/components/EmptyState';

const FILTER_COLORS: Record<PostFilter, { color: string; bg: string }> = {
  All: { color: COLORS.primary, bg: COLORS.primaryLighter },
  Pregnancy: { color: '#F5A0B0', bg: '#FCE4EE' },
  'Mental Health': { color: '#A8C4E0', bg: '#D4E8F7' },
};

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const originalPost = POSTS.find((p) => p.id === id);
  const [post, setPost] = useState(originalPost);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(originalPost?.liked ?? false);
  const [likeCount, setLikeCount] = useState(originalPost?.likeCount ?? 0);

  if (!post) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState title="Post not found" subtitle="This post does not exist." />
      </SafeAreaView>
    );
  }

  const fc = FILTER_COLORS[post.tag];

  const toggleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  const submitComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: `c${Date.now()}`,
      username: 'Sarah Johnson',
      avatar: '🌸',
      avatarBg: COLORS.primaryLighter,
      text: newComment.trim(),
      timestamp: 'Just now',
    };
    setPost((prev) => prev ? { ...prev, comments: [...prev.comments, comment] } : prev);
    setNewComment('');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>Post</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Post */}
          <View style={[styles.postCard, SHADOW.small]}>
            <View style={styles.postHeader}>
              <View style={[styles.avatar, { backgroundColor: post.avatarBg }]}>
                <Text style={styles.avatarEmoji}>{post.avatar}</Text>
              </View>
              <View style={styles.authorInfo}>
                <Text style={styles.username}>{post.username}</Text>
                <Text style={styles.timestamp}>{post.timestamp}</Text>
              </View>
              <View style={[styles.tagChip, { backgroundColor: fc.bg }]}>
                <Text style={[styles.tagText, { color: fc.color }]}>{post.tag}</Text>
              </View>
            </View>
            <Text style={styles.postText}>{post.text}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={toggleLike}>
                <Text style={styles.actionIcon}>{liked ? '💜' : '🤍'}</Text>
                <Text style={[styles.actionCount, liked && { color: COLORS.primary }]}>
                  {likeCount} likes
                </Text>
              </TouchableOpacity>
              <View style={styles.actionBtn}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionCount}>{post.comments.length} comments</Text>
              </View>
            </View>
          </View>

          {/* Comments */}
          <Text style={styles.commentsTitle}>
            Comments ({post.comments.length})
          </Text>
          {post.comments.length === 0 ? (
            <View style={styles.noComments}>
              <Text style={styles.noCommentsText}>No comments yet. Be the first to reply!</Text>
            </View>
          ) : (
            post.comments.map((comment) => (
              <View key={comment.id} style={[styles.commentCard, SHADOW.small]}>
                <View style={[styles.commentAvatar, { backgroundColor: comment.avatarBg }]}>
                  <Text style={styles.commentAvatarEmoji}>{comment.avatar}</Text>
                </View>
                <View style={styles.commentBody}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUsername}>{comment.username}</Text>
                    <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              </View>
            ))
          )}
          <View style={{ height: SPACING.xl }} />
        </ScrollView>

        {/* Comment Input */}
        <View style={[styles.commentInputRow, SHADOW.medium]}>
          <View style={[styles.commentInputAvatar, { backgroundColor: COLORS.primaryLighter }]}>
            <Text style={{ fontSize: 16 }}>🌸</Text>
          </View>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            placeholderTextColor={COLORS.textMuted}
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !newComment.trim() && styles.sendBtnDisabled]}
            onPress={submitComment}
            disabled={!newComment.trim()}
          >
            <Text style={styles.sendBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 60,
  },
  backText: {
    fontSize: 16,
    color: COLORS.primary,
    ...FONT.semibold,
  },
  navTitle: {
    fontSize: 16,
    ...FONT.bold,
    color: COLORS.textPrimary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  postCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 22,
  },
  authorInfo: {
    flex: 1,
    gap: 2,
  },
  username: {
    fontSize: 15,
    ...FONT.semibold,
    color: COLORS.textPrimary,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textMuted,
    ...FONT.regular,
  },
  tagChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  tagText: {
    fontSize: 11,
    ...FONT.semibold,
  },
  postText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    ...FONT.regular,
    lineHeight: 23,
  },
  postActions: {
    flexDirection: 'row',
    gap: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  actionIcon: {
    fontSize: 18,
  },
  actionCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
    ...FONT.medium,
  },
  commentsTitle: {
    fontSize: 16,
    ...FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  noComments: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  noCommentsText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    ...FONT.regular,
  },
  commentCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAvatarEmoji: {
    fontSize: 18,
  },
  commentBody: {
    flex: 1,
    gap: 4,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  commentUsername: {
    fontSize: 13,
    ...FONT.semibold,
    color: COLORS.textPrimary,
  },
  commentTimestamp: {
    fontSize: 11,
    color: COLORS.textMuted,
    ...FONT.regular,
  },
  commentText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    ...FONT.regular,
    lineHeight: 18,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: SPACING.sm,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  commentInputAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentInput: {
    flex: 1,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 14,
    color: COLORS.textPrimary,
    ...FONT.regular,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.primaryLight,
  },
  sendBtnText: {
    fontSize: 13,
    ...FONT.bold,
    color: COLORS.white,
  },
});
