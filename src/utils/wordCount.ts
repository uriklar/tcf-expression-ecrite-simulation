import type { TaskStatus } from '../types';

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getTaskStatus(wordCount: number, minWords: number): TaskStatus {
  if (wordCount === 0) return 'not-started';
  if (wordCount < minWords) return 'incomplete';
  return 'complete';
}
