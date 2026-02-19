export type Task = {
  id: string;
  title: string;
  category: string;
  icon: string;
  iconBg: string;
  completed: boolean;
};

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Drink 8 glasses of water',
    category: 'Nutrition',
    icon: '💧',
    iconBg: '#D4E8F7',
    completed: true,
  },
  {
    id: 't2',
    title: '30-minute morning walk',
    category: 'Physical Activity',
    icon: '🏃‍♀️',
    iconBg: '#FCE4EE',
    completed: true,
  },
  {
    id: 't3',
    title: '10 min mindfulness meditation',
    category: 'Healthy Habits',
    icon: '🧘‍♀️',
    iconBg: '#EDE0F7',
    completed: false,
  },
  {
    id: 't4',
    title: 'Take prenatal vitamins',
    category: 'Nutrition',
    icon: '💊',
    iconBg: '#D4F0E4',
    completed: false,
  },
  {
    id: 't5',
    title: 'Sleep by 10:30 PM',
    category: 'Sleep & Fertility',
    icon: '🌙',
    iconBg: '#EDE0F7',
    completed: false,
  },
  {
    id: 't6',
    title: 'Journal for 5 minutes',
    category: 'Healthy Habits',
    icon: '📔',
    iconBg: '#FEF4C0',
    completed: true,
  },
  {
    id: 't7',
    title: 'Eat 5 servings of vegetables',
    category: 'Nutrition',
    icon: '🥦',
    iconBg: '#D4F0E4',
    completed: false,
  },
  {
    id: 't8',
    title: 'Stretch for 15 minutes',
    category: 'Physical Activity',
    icon: '🤸‍♀️',
    iconBg: '#FCE4EE',
    completed: false,
  },
];
