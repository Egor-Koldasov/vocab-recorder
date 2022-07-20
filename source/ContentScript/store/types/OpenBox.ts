import { RefObject } from "react";
import { Coord } from "../../../types/Coord";
import { PointedWord } from "../../../types/PointedWord";

export type OpenBox = {
  open: boolean,
  point: PointedWord,
  translation: string,
  context: string,
  ref: (() => (RefObject<HTMLDivElement | null>)) | null,
  drag: {
    movedPos: Coord | null,
    active: boolean,
    mouseInBoxPos: Coord | null,
  },
};
