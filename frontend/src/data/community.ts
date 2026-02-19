export type PostFilter = 'All' | 'Pregnancy' | 'Mental Health';

export type Post = {
  id: string;
  username: string;
  avatar: string;
  avatarBg: string;
  timestamp: string;
  text: string;
  tag: PostFilter;
  likeCount: number;
  commentCount: number;
  comments: Comment[];
  liked: boolean;
};

export type Comment = {
  id: string;
  username: string;
  avatar: string;
  avatarBg: string;
  text: string;
  timestamp: string;
};

export const POSTS: Post[] = [
  {
    id: 'p1',
    username: 'Luna Martinez',
    avatar: '🌸',
    avatarBg: '#EDE0F7',
    timestamp: '2 hours ago',
    text: "Just finished week 3 of cycle syncing my workouts and I cannot believe the difference! My energy during the follicular phase is through the roof. Anyone else trying this? Would love to hear your experiences! 💜",
    tag: 'All',
    likeCount: 47,
    commentCount: 12,
    liked: false,
    comments: [
      {
        id: 'c1',
        username: 'Aria Chen',
        avatar: '🌷',
        avatarBg: '#FCE4EE',
        text: "Yes! I started 2 months ago and it's life-changing. The luteal phase rest days are so important!",
        timestamp: '1 hour ago',
      },
      {
        id: 'c2',
        username: 'Sophie Williams',
        avatar: '🌿',
        avatarBg: '#D4F0E4',
        text: 'Can you share your workout schedule? I struggle with consistency.',
        timestamp: '45 min ago',
      },
    ],
  },
  {
    id: 'p2',
    username: 'Emma Rose',
    avatar: '🌷',
    avatarBg: '#FCE4EE',
    timestamp: '5 hours ago',
    text: "Currently 16 weeks pregnant and the second trimester energy boost is REAL. Finally feel like myself again after weeks of exhaustion. Has anyone found gentle exercises that helped them stay active? 🤰",
    tag: 'Pregnancy',
    likeCount: 89,
    commentCount: 23,
    liked: true,
    comments: [
      {
        id: 'c3',
        username: 'Grace Kim',
        avatar: '💐',
        avatarBg: '#FEF4C0',
        text: 'Prenatal yoga was a game changer for me! Swimming too if you have access.',
        timestamp: '4 hours ago',
      },
      {
        id: 'c4',
        username: 'Maya Johnson',
        avatar: '🌺',
        avatarBg: '#EDE0F7',
        text: 'Walking daily was my go-to. 30 min after dinner helped with digestion too.',
        timestamp: '3 hours ago',
      },
    ],
  },
  {
    id: 'p3',
    username: 'Zoe Park',
    avatar: '🌿',
    avatarBg: '#D4F0E4',
    timestamp: '1 day ago',
    text: "Friendly reminder: it's okay to not be okay. Mental health is just as important as physical health. I've been struggling with anxiety this month and finally booked a therapy appointment. Proud of myself for reaching out 💙",
    tag: 'Mental Health',
    likeCount: 156,
    commentCount: 31,
    liked: false,
    comments: [
      {
        id: 'c5',
        username: 'Luna Martinez',
        avatar: '🌸',
        avatarBg: '#EDE0F7',
        text: "So proud of you! That first step is the hardest. You've got this! 💜",
        timestamp: '22 hours ago',
      },
    ],
  },
  {
    id: 'p4',
    username: 'Claire Dubois',
    avatar: '💐',
    avatarBg: '#FEF4C0',
    timestamp: '2 days ago',
    text: "Week 38 update: baby's room is finally ready, hospital bag is packed, and I'm trying to stay calm and present. Any last-minute tips from moms who've been here? 🍃",
    tag: 'Pregnancy',
    likeCount: 203,
    commentCount: 67,
    liked: false,
    comments: [],
  },
  {
    id: 'p5',
    username: 'Aria Chen',
    avatar: '🌺',
    avatarBg: '#FCE4EE',
    timestamp: '3 days ago',
    text: "Hot take: tracking your cycle is one of the most empowering things you can do for your health. Three months in and I can predict my energy levels, cravings, and mood patterns. Knowledge is power! ✨",
    tag: 'All',
    likeCount: 78,
    commentCount: 19,
    liked: true,
    comments: [],
  },
  {
    id: 'p6',
    username: 'Maya Johnson',
    avatar: '🌙',
    avatarBg: '#EDE0F7',
    timestamp: '4 days ago',
    text: "Postpartum anxiety is real and it took me too long to ask for help. If you're a new mom feeling overwhelmed, please reach out to your healthcare provider. You deserve support too. Sharing in case someone needs to hear this today 💕",
    tag: 'Mental Health',
    likeCount: 312,
    commentCount: 88,
    liked: false,
    comments: [],
  },
];
