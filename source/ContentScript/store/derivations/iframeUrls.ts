import { languages } from "countries-list";
import { LanguageKey, State } from "../types/Store";

export type IframeProps = {
  sourceLanguage: LanguageKey,
  targetLanguage: LanguageKey,
  word: string,
}

export const stateToIframeProps = (state: State): IframeProps => ({
  sourceLanguage: state.sourceLanguage || 'en',
  targetLanguage: state.targetLanguage,
  word: state.openBox?.point.word || '',
})

export const getGTransalteUrl = (props: IframeProps) => {
  return `https://translate.google.com/?sl=${props.sourceLanguage}&tl=${props.targetLanguage}&text=${props.word}`;
}
export const getGlosbeUrl = (props: IframeProps) => {
  return `https://${props.targetLanguage}.glosbe.com/${props.sourceLanguage}/${props.targetLanguage}/${props.word}`;
}
export const getReversoUrl = (props: IframeProps) => {
  return `https://context.reverso.net/translation/${languages[props.sourceLanguage].name.toLocaleLowerCase()}-${languages[props.targetLanguage].name.toLocaleLowerCase()}/${props.word}`;
}
