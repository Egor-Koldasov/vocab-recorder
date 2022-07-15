export const getPositionFromPoint = (x: number, y: number) => {
  if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(x, y);
    if (!range)
      return null;
    return {
      offsetNode: range.startContainer,
      offset: range.startOffset,
    };
  }
  if (document.caretPositionFromPoint) {
    return document.caretPositionFromPoint(x, y);
  }
  throw new Error('Browser does not support caretRangeFromPoint or caretPositionFromPoint');
};
