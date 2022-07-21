import browser from "webextension-polyfill";
import { BrowserWithShadowRoot } from "../../types/BrowserWithShadowRoot";


export const getGTranslateShadowRoot = () => {
  const gTranslatePopup = document.querySelector('#gtx-host');
  if (!gTranslatePopup) return;
  const supportedBrowser = browser as BrowserWithShadowRoot;
  const gTranslateShadowRoot = supportedBrowser.dom.openOrClosedShadowRoot(gTranslatePopup);
  return gTranslateShadowRoot;
}