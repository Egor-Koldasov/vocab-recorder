import { OnPageBox } from "./components/OnPageBox";
import ReactDOM from 'react-dom';
import React from 'react';

export const render = () => {
  const id = 'vocab-recorder-root' as const;
  const root = document.createElement('div');
  root.id = id;
  document.body.append(root);
  ReactDOM.render(<OnPageBox />, document.getElementById(id));
}