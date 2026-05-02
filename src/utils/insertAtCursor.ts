export function insertAtCursor(
  textarea: HTMLTextAreaElement,
  value: string,
  character: string,
): { nextValue: string; nextCursor: number } {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const nextValue = `${value.slice(0, start)}${character}${value.slice(end)}`;
  const nextCursor = start + character.length;

  return { nextValue, nextCursor };
}
