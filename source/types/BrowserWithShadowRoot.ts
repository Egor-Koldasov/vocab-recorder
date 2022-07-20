import { Browser } from "webextension-polyfill";

export type BrowserWithShadowRoot = Browser & {
  dom: {
    openOrClosedShadowRoot: <T extends Element>(element: T) => T | null
  }
}