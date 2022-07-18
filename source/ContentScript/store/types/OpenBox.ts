import { RefObject } from "react";
import { Coord } from "../../../types/Coord";
import { PointedWord } from "../../../types/PointedWord";

export type OpenBox = {
  point: PointedWord,
  translation: string,
  context: string,
  ref: (() => (RefObject<HTMLDivElement | null>)) | null,
  drag: {
    shift: Coord,
    active: boolean,
    dragStartPos: Coord | null,
  },
};
