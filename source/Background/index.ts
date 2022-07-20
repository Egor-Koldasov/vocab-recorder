import 'emoji-log';
import browser from 'webextension-polyfill';
import { Message } from '../types/Message';

browser.runtime.onInstalled.addListener((): void => {
  console.emoji('🦄', 'extension installed');
  browser.contextMenus.create({
    title: 'Add word',
    contexts: ['all'],
    id: 'selectionMenu',
  });
});
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log('Menu click', info, tab);
  if (!tab?.id) throw new Error('No tab id found');
  browser.tabs.sendMessage(tab.id, { name: 'context-click' });
});

browser.runtime.onMessage.addListener(
  function(message: Message) {
    console.log('message', message);
  }
);
