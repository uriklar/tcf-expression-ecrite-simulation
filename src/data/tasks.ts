import type { WritingTask } from '../types';

export const initialTasks: WritingTask[] = [
  {
    id: 1,
    title: 'Task 1',
    type: 'Short message',
    minWords: 60,
    maxWords: 120,
    suggestedMinutes: 10,
    prompt:
      'You recently moved to a new city. Write a short message to a French-speaking friend to describe your first impressions and invite them to visit you.',
    answer: '',
  },
  {
    id: 2,
    title: 'Task 2',
    type: 'Formal letter or note',
    minWords: 120,
    maxWords: 150,
    suggestedMinutes: 15,
    prompt:
      'You attended a community workshop but were not satisfied with the organization. Write a formal note to the organizer explaining the problem and suggesting improvements.',
    answer: '',
  },
  {
    id: 3,
    title: 'Task 3',
    type: 'Argumentative comparison',
    minWords: 120,
    maxWords: 180,
    suggestedMinutes: 35,
    prompt:
      'Compare the two viewpoints below and give your opinion. Explain which position seems more convincing and why.',
    documents: [
      {
        label: 'Viewpoint A',
        text: 'Remote work gives employees more flexibility and reduces commuting time. It can also help companies hire people from different regions.',
      },
      {
        label: 'Viewpoint B',
        text: 'Working in an office encourages collaboration and makes communication easier. It can also help new employees learn more quickly.',
      },
    ],
    answer: '',
  },
];
