import { Coord } from "../../../types/Coord";
import { PointedWord } from "../../../types/PointedWord";

export type OpenBox = {
  point: PointedWord,
  translation: string,
  context: string,
  drag: {
    pos: Coord | null,
    active: boolean,
  },
};
