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
  if (!range || !range.offsetNode.textContent) {
    console.debug('no range found', event);
    return null;
  }
  const word = getWordByOffset(range.offsetNode.textContent, range.offset);
  const selection = window.getSelection()?.toString();
  const isSingleWordSelected = selection && !!selection.match(/^((\p{L})|[-_])+$/u);
  const context =
    (selection && !isSingleWordSelected) ?
      selection :
      range.offsetNode.textContent;
  // console.log('word', rect, range.offsetNode);
  return {
    word,
    context: context.trim(),
    offset: range.offset,
    cursor,
  };
}