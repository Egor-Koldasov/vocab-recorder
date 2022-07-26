import { onPage } from "./mutations/onPage";
import { basic } from "./mutations/basic";
import { openBox } from "./mutations/openBox";
import { Context } from "./types/Store";
import { savedWords } from "./mutations/savedWords";


// auto-complete breaks the ts server here, add imports manually
export const getMutations = (context: Context) => ({
  ...basic(context),
  ...onPage(context),
  ...openBox(context),
  ...savedWords(context),
}) as const;
