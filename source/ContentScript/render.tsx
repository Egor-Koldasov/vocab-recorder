import { OnPageBox } from "./components/OnPageBox";
import { createRoot } from 'react-dom/client';
import React from 'react';
import { StyleSheetManager } from "styled-components";
import { stylisAddImportant } from "./util/stylisAddImportant";
import { extractCss } from "goober";
import { bindCssTarget } from "react-hot-toast";

const setCssTarget = (target: Element) => {
  target.innerHTML = extractCss(document as unknown as Element);
  target.id = '_goober';
  const prevStyles = document.querySelector('#_goober');
  if (prevStyles) prevStyles.remove();
  bindCssTarget(target);
}

export const render = () => {
  const id = 'vocab-recorder-root' as const;
  const root = document.createElement('div');
  const styles = document.createElement('div');
  const shadow = root.attachShadow({ mode: 'closed' });
  root.id = id;
  styles.id = `${id}-styles`;
  shadow.append(styles);
  const gooberStyles = document.createElement('style');
  setCssTarget(gooberStyles);
  document.body.append(root);
  const reactRoot = createRoot(shadow);
  styles.append(gooberStyles);
  reactRoot.render(
    <StyleSheetManager target={styles} stylisPlugins={[stylisAddImportant]}>
      <OnPageBox />
    </StyleSheetManager>
  );
}
