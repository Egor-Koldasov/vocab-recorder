import { Coord } from "../../types/Coord";
import { PointedWord } from "../../types/PointedWord";
import { getPositionFromPoint } from "./getPositionFromPoint";
import { getWordByOffset } from "./getWordByOffset";

export const mouseMoveToCursor = (event: MouseEvent): Coord => {
  const cursor = { x: event.clientX, y: event.clientY };
  return cursor;
}

export const mouseMoveToSelectedWord = (event: MouseEvent): PointedWord | null => {
  const range = getPositionFromPoint(event.clientX, event.clientY);
  const cursor = mouseMoveToCursor(event);
  if (!range || !range.offsetNode.textContent) return null;
  const word = getWordByOffset(range.offsetNode.textContent, range.offset);
  const selection = window.getSelection()?.toString();
  // console.log('word', rect, range.offsetNode);
  return {
    word,
    context: selection || range.offsetNode.textContent,
    offset: range.offset,
    cursor,
  };
}