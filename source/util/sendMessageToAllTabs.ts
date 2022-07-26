import browser from "webextension-polyfill";
import { AnyObject } from "zustand-ready";

export const sendMessageToAllTabs = async (message: AnyObject) => {
  const tabs = await browser.tabs.query({});
  tabs.map((tab) => {
    if (tab.id) browser.tabs.sendMessage(tab.id, message);
  });
}