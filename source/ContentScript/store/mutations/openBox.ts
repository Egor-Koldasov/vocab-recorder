import { ChangeEvent } from "react";
import { Context } from "../types/Store";

export const openBox = ({ get }: Context) => {
  return {
    onContextChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { mutations } = get();
      mutations.update({ openBox: { context: event.currentTarget.value } });
    },
    onTranslationChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { mutations } = get();
      mutations.update({ openBox: { translation: event.currentTarget.value } });
    },
    onCloseClick: () => {
      get().mutations.update({ openBox: null });
    },
  } as const;
};
