import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from '@/src/constants/theme';
import { POSTS, Post, PostFilter } from '@/src/data/community';
import { EmptyState } from '@/src/components/EmptyState';

const FILTERS: PostFilter[] = ['All', 'Pregnancy', 'Mental Health'];

const FILTER_COLORS: Record<PostFilter, { color: string; bg: string }> = {
  All: { color: COLORS.primary, bg: COLORS.primaryLighter },
  Pregnancy: { color: '#F5A0B0', bg: '#FCE4EE' },
  'Mental Health': { color: '#A8C4E0', bg: '#D4E8F7' },
};

export default function CommunityScreen() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [activeFilter, setActiveFilter] = useState<PostFilter>('All');
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostTag, setNewPostTag] = useState<PostFilter>('All');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = activeFilter === 'All'
    ? posts
    : posts.filter((p) => p.tag === activeFilter);

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1 }
          : p
      )
    );
  };

  const submitPost = () => {
    if (!newPostText.trim()) return;
    const newPost: Post = {
      id: `p${Date.now()}`,
      username: 'Sarah Johnson',
      avatar: '🌸',
      avatarBg: COLORS.primaryLighter,
      timestamp: 'Just now',
      text: newPostText.trim(),
      tag: newPostTag,
      likeCount: 0,
      commentCount: 0,
      comments: [],
      liked: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setNewPostText('');
    setNewPostTag('All');
    setShowNewPost(false);
  };

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={[styles.postCard, SHADOW.small]}
      onPress={() => router.push(`/post/${item.id}` as any)}
      activeOpacity={0.9}
    >
      <View style={styles.postHeader}>
        <View style={[styles.avatar, { backgroundColor: item.avatarBg }]}>
          <Text style={styles.avatarEmoji}>{item.avatar}</Text>
        </View>
        <View style={styles.postAuthorInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <View style={[styles.tagChip, { backgroundColor: FILTER_COLORS[item.tag].bg }]}>
          <Text style={[styles.tagText, { color: FILTER_COLORS[item.tag].color }]}>
            {item.tag}
          </Text>
        </View>
      </View>
      <Text style={styles.postText} numberOfLines={3}>{item.text}</Text>
      <View style={styles.postFooter}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={(e) => {
            e.stopPropagation();
            toggleLike(item.id);
          }}
        >
          <Text style={styles.footerIcon}>{item.liked ? '💜' : '🤍'}</Text>
          <Text style={[styles.footerCount, item.liked && { color: COLORS.primary }]}>
            {item.likeCount}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerBtn}>
          <Text style={styles.footerIcon}>💬</Text>
          <Text style={styles.footerCount}>{item.commentCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading community...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.screenTitle}>Community</Text>
              <Text style={styles.screenSubtitle}>Connect with others on your journey</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersRow}
            >
              {FILTERS.map((filter) => {
                const active = activeFilter === filter;
                const fc = FILTER_COLORS[filter];
                return (
                  <TouchableOpacity
                    key={filter}
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor: active ? fc.bg : COLORS.surface,
                        borderColor: active ? fc.color : COLORS.border,
                      },
                    ]}
                    onPress={() => setActiveFilter(filter)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        { color: active ? fc.color : COLORS.textSecondary },
                      ]}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="💬"
            title="No posts yet"
            subtitle="Be the first to share in this category!"
          />
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, SHADOW.medium]}
        onPress={() => setShowNewPost(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* New Post Modal */}
      <Modal
        visible={showNewPost}
        animationType="slide"
        transparent
        onRequestClose={() => setShowNewPost(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Share with the community</Text>

            <Text style={styles.fieldLabel}>Topic</Text>
            <View style={styles.tagRow}>
              {FILTERS.map((tag) => {
                const active = newPostTag === tag;
                const fc = FILTER_COLORS[tag];
                return (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tagOption,
                      { backgroundColor: active ? fc.bg : COLORS.surfaceSecondary, borderColor: active ? fc.color : 'transparent' },
                    ]}
                    onPress={() => setNewPostTag(tag)}
                  >
                    <Text style={[styles.tagOptionText, { color: active ? fc.color : COLORS.textSecondary }]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.fieldLabel}>Your message</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={5}
              placeholder="Share your thoughts, experiences or questions..."
              placeholderTextColor={COLORS.textMuted}
              value={newPostText}
              onChangeText={setNewPostText}
              textAlignVertical="top"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setShowNewPost(false);
                  setNewPostText('');
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitBtn, !newPostText.trim() && styles.submitBtnDisabled]}
                onPress={submitPost}
                disabled={!newPostText.trim()}
              >
                <Text style={styles.submitBtnText}>Post</Text>
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
  filtersRow: {
    paddingBottom: SPACING.md,
    gap: SPACING.sm,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
  },
  filterText: {
    fontSize: 13,
    ...FONT.semibold,
  },
  postCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  postAuthorInfo: {
    flex: 1,
    gap: 1,
  },
  username: {
    fontSize: 14,
    ...FONT.semibold,
    color: COLORS.textPrimary,
  },
  timestamp: {
    fontSize: 11,
    color: COLORS.textMuted,
    ...FONT.regular,
  },
  tagChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  tagText: {
    fontSize: 10,
    ...FONT.semibold,
  },
  postText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    ...FONT.regular,
    lineHeight: 20,
  },
  postFooter: {
    flexDirection: 'row',
    gap: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  footerIcon: {
    fontSize: 16,
  },
  footerCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
    ...FONT.medium,
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
  tagRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  tagOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
  },
  tagOptionText: {
    fontSize: 13,
    ...FONT.medium,
  },
  textArea: {
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    fontSize: 14,
    color: COLORS.textPrimary,
    ...FONT.regular,
    minHeight: 120,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
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
  submitBtn: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  submitBtnDisabled: {
    backgroundColor: COLORS.primaryLight,
  },
  submitBtnText: {
    fontSize: 15,
    ...FONT.bold,
    color: COLORS.white,
  },
});
