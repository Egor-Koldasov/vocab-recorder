export const isDeepParentNode = (node: Node, parent: Node) => {
  let elementI = node;
  while (elementI !== document.body && elementI.parentNode) {
    if (elementI === parent) {
      return true;
    }
    elementI = elementI.parentNode;
  }
  return false;
}