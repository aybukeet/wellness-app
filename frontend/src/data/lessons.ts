export type LessonStatus = 'completed' | 'in-progress' | 'not-started';

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  status: LessonStatus;
  thumbnail: string;
  description: string;
  weekNumber: number;
};

export const LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Understanding Your Hormonal Cycle',
    duration: '12 min',
    category: 'Sleep & Fertility',
    categoryColor: '#9B7EC8',
    categoryBg: '#EDE0F7',
    status: 'completed',
    thumbnail: '🌸',
    description:
      "Dive deep into the four phases of your menstrual cycle and how each phase influences your energy, mood, and overall wellbeing. Understand the hormonal shifts that drive your body's rhythms.",
    weekNumber: 1,
  },
  {
    id: 'l2',
    title: 'Nutrition for Cycle Syncing',
    duration: '18 min',
    category: 'Nutrition',
    categoryColor: '#7DC8A0',
    categoryBg: '#D4F0E4',
    status: 'completed',
    thumbnail: '🥑',
    description:
      "Learn how to align your diet with your cycle phases for optimal energy and hormonal balance. Discover which foods to prioritize during each phase.",
    weekNumber: 1,
  },
  {
    id: 'l3',
    title: 'Sleep Hygiene & Hormone Health',
    duration: '15 min',
    category: 'Sleep & Fertility',
    categoryColor: '#9B7EC8',
    categoryBg: '#EDE0F7',
    status: 'in-progress',
    thumbnail: '🌙',
    description:
      "Explore the critical relationship between sleep quality and hormone regulation. Learn evidence-based strategies to improve your sleep and support your body's natural healing processes.",
    weekNumber: 2,
  },
  {
    id: 'l4',
    title: 'Mindful Movement for Every Phase',
    duration: '20 min',
    category: 'Physical Activity',
    categoryColor: '#F5A0B0',
    categoryBg: '#FCE4EE',
    status: 'in-progress',
    thumbnail: '🧘‍♀️',
    description:
      "Match your exercise routine to your cycle for maximum benefit and minimal burnout. From high-intensity training to restorative yoga, find your rhythm.",
    weekNumber: 2,
  },
  {
    id: 'l5',
    title: 'Stress Management Techniques',
    duration: '10 min',
    category: 'Healthy Habits',
    categoryColor: '#F5C44A',
    categoryBg: '#FEF4C0',
    status: 'not-started',
    thumbnail: '✨',
    description:
      "Cortisol is a key player in hormonal balance. Learn practical techniques to manage stress and protect your hormonal health through daily habits.",
    weekNumber: 3,
  },
  {
    id: 'l6',
    title: 'Gut Health & Hormones',
    duration: '22 min',
    category: 'Nutrition',
    categoryColor: '#7DC8A0',
    categoryBg: '#D4F0E4',
    status: 'not-started',
    thumbnail: '🫐',
    description:
      "Your gut microbiome plays a critical role in estrogen metabolism. Discover how to nourish your gut for better hormonal balance and overall health.",
    weekNumber: 3,
  },
  {
    id: 'l7',
    title: 'Fertility Awareness Method',
    duration: '25 min',
    category: 'Sleep & Fertility',
    categoryColor: '#9B7EC8',
    categoryBg: '#EDE0F7',
    status: 'not-started',
    thumbnail: '🌺',
    description:
      "A comprehensive guide to understanding and tracking your fertility signals. Learn how to read your body's natural signs and take charge of your reproductive health.",
    weekNumber: 4,
  },
];
