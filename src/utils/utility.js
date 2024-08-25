export function penultimateIndexOf(str, char) {
  let lastIndex = str.lastIndexOf(char);
  if (lastIndex === -1) return -1;
  let penultimateIndex = str.lastIndexOf(char, lastIndex - 1);
  return penultimateIndex;
}