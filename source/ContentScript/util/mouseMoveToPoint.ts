import { PointedWord } from "../../types/PointedWord";
import { getPositionFromPoint } from "./getPositionFromPoint";
import { getWordByOffset } from "./getWordByOffset";

export const mouseMoveToPoint = (event: MouseEvent): PointedWord | null => {
  const range = getPositionFromPoint(event.clientX, event.clientY);
  if (!range || !range.offsetNode.textContent) return null;
  const word = getWordByOffset(range.offsetNode.textContent, range.offset);
  const rect = (range.offsetNode.parentElement as Element).getBoundingClientRect();
  const selection = window.getSelection()?.toString();
  // console.log('word', rect, range.offsetNode);
  return {
    word,
    context: selection || range.offsetNode.textContent,
    offset: range.offset,
    rect,
    cursor: { x: event.clientX, y: event.clientY },
    windowScroll: { x: window.scrollX, y: window.scrollY },
  };
}