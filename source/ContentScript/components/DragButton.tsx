import React from 'react';
import { useMutations } from '../store/useStore';
import { useListener } from '../util/useListener';
import { Drag } from "./icons/Drag";


export const DragButton = () => {
  const { onDragMouseDown, onDragMouseUp } = useMutations();
  useListener('mouseup', onDragMouseUp);
  return (
    <Drag
      onMouseDown={onDragMouseDown}
    />
  );
};
