import { Message } from "../../types/Message";
import browser from 'webextension-polyfill';

export const sendMessage = async (message: Message) => {
  await browser.runtime.sendMessage(message);
};
