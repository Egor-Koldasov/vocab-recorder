type CaretPosition = {
  readonly offset: number;
  readonly offsetNode: Node;
  getClientRect(): DOMRect | null;
}
type DocumentPatched = Document & {
  caretPositionFromPoint: (x: number, y: number) => CaretPosition | null
}

export const getPositionFromPoint = (x: number, y: number) => {
  const doc = document as DocumentPatched;
  if (doc.caretRangeFromPoint) {
    const range = doc.caretRangeFromPoint(x, y);
    if (!range)
      return null;
    return {
      offsetNode: range.startContainer,
      offset: range.startOffset,
    };
  }
  if (doc.caretPositionFromPoint) {
    return doc.caretPositionFromPoint(x, y);
  }
  throw new Error('Browser does not support caretRangeFromPoint or caretPositionFromPoint');
};
