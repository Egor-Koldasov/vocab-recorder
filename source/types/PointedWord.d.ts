import { Coord } from "./Coord";

export type PointedWord = {
  word: string;
  context: string;
  offset: number;
  cursor: Coord;
}