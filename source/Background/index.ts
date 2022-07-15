import 'emoji-log';
import browser from 'webextension-polyfill';
import { Message } from '../types/Message';

browser.runtime.onInstalled.addListener((): void => {
  console.emoji('🦄', 'extension installed');
  browser.contextMenus.create({
    title: 'test',
    contexts: ['all'],
    id: 'selectionMenu',
  });
});
browser.contextMenus.onClicked.addListener((info, tab) => {
  console.log('Menu click', info, tab);
});

browser.runtime.onMessage.addListener(
  function(message: Message) {
    console.log('message', message);
  }
);
