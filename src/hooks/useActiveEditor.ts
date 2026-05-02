import { RefObject, useRef } from 'react';

export function useActiveEditor(): RefObject<HTMLTextAreaElement> {
  return useRef<HTMLTextAreaElement>(null);
}
