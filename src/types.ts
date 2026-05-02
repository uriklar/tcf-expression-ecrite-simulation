export type TaskStatus = 'not-started' | 'incomplete' | 'complete';

export type WritingTask = {
  id: 1 | 2 | 3;
  title: string;
  type: string;
  prompt: string;
  minWords: number;
  maxWords: number;
  suggestedMinutes: number;
  answer: string;
  documents?: {
    label: string;
    text: string;
  }[];
};
