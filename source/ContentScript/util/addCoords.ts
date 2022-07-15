import { Coord } from "../../types/Coord";

export const addCoords = (coord1: Coord, coord2: Coord): Coord => {
  return {
    x: coord1.x + coord2.x,
    y: coord1.y + coord2.y,
  };
};
