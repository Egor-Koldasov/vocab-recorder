import { StylisPlugin } from "styled-components";


export const STYLIS_PROPERTY_CONTEXT = 1;
export const stylisAddImportant: StylisPlugin = (context, content) => {
  if (context === STYLIS_PROPERTY_CONTEXT) {
    return /!important/.test(String(content))
      ? String(content)
      : content + ' !important';
  }
  return undefined;
};
// stable identifier that will not be dropped by minification unless the whole module
// is unused
Object.defineProperty(stylisAddImportant, 'name', {
  value: 'stylisAddImportant'
});
