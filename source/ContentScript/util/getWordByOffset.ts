const isWordBreakChar = (char: string) => !char.match(/(\w)|[-_]/);
export const getWordByOffset = (string: string, offset: number) => {
  if (offset < 0 || offset > string.length)
    throw new Error('Offset is out of boundary');
  let start = offset;
  let end = offset;
  while (start > 0) {
    if (isWordBreakChar(string[start - 1]))
      break;
    start--;
  }
  while (end < string.length - 1) {
    if (isWordBreakChar(string[end + 1]))
      break;
    end++;
  }
  // console.log('end break char', string[end + 1]);
  return string.substr(start, end - start + 1);
};
