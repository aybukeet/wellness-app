export type Category = {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  articleCount: number;
};

export const CATEGORIES: Category[] = [
  {
    id: 'sleep-fertility',
    title: 'Sleep & Fertility',
    icon: '🌙',
    color: '#9B7EC8',
    bgColor: '#EDE0F7',
    description:
      'Discover the powerful connection between quality sleep and reproductive health. Learn how rest cycles affect hormones, ovulation, and fertility.',
    articleCount: 12,
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    icon: '🥗',
    color: '#7DC8A0',
    bgColor: '#D4F0E4',
    description:
      "Fuel your body with the right nutrients for every phase of your cycle. Evidence-based dietary guidance tailored for women's wellness.",
    articleCount: 18,
  },
  {
    id: 'physical-activity',
    title: 'Physical Activity',
    icon: '🏃‍♀️',
    color: '#F5A0B0',
    bgColor: '#FCE4EE',
    description:
        "Find the perfect exercise balance throughout your cycle. From gentle yoga to cardio, align movement with your body's natural rhythm.",
    articleCount: 15,
  },
  {
    id: 'healthy-habits',
    title: 'Healthy Habits',
    icon: '✨',
    color: '#F5C44A',
    bgColor: '#FEF4C0',
    description:
      'Build sustainable routines that support your hormonal health. Mindfulness, stress management, and daily rituals for lasting wellness.',
    articleCount: 20,
  },
];

export type DailyRecommendation = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  bgColor: string;
  icon: string;
};

export const DAILY_RECOMMENDATION: DailyRecommendation = {
  id: 'daily-1',
  title: 'Morning Mindfulness Reset',
  subtitle: 'Start your day with a calming breathing exercise designed to balance cortisol levels.',
  category: 'Healthy Habits',
  duration: '5 min',
  bgColor: '#9B7EC8',
  icon: '🧘‍♀️',
};
