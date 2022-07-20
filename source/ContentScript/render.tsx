import { OnPageBox } from "./components/OnPageBox";
import { createRoot } from 'react-dom/client';
import React from 'react';
import { StyleSheetManager } from "styled-components";
import { stylisAddImportant } from "./util/stylisAddImportant";

export const render = () => {
  const id = 'vocab-recorder-root' as const;
  const root = document.createElement('div');
  const styles = document.createElement('div');
  const shadow = root.attachShadow({ mode: 'closed' });
  root.id = id;
  shadow.append(styles);
  document.body.append(root);
  const reactRoot = createRoot(shadow);
  reactRoot.render(
    <StyleSheetManager target={styles} stylisPlugins={[stylisAddImportant]}>
      <OnPageBox />
    </StyleSheetManager>
  );
}