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
  function (message: Message) {
    console.log('message', message);
  }
);

const urlsToPass = [
  'https://translate.google.com/*',
  'https://en.glosbe.com/*',
  'https://context.reverso.net/*',
];

browser.webRequest.onHeadersReceived.addListener(
  function (info) {
    console.log('onHeadersReceived', info);
    const headers = info.responseHeaders || [];
    const processedHeaders =
      headers
        .filter((header) => {
          const headerName = header.name.toLowerCase();
          if (headerName === 'x-frame-options' || headerName === 'frame-options') {
            return false;
          }
          return true;
        })
        .map((header) => {
          const headerName = header.name.toLowerCase();
          if (headerName === 'location' && header.value?.startsWith('http:')) {
            header.value = 'https' + header.value.substring(4);
          }
          return header;
        })
    return { responseHeaders: processedHeaders };
  }, {
  urls: [...urlsToPass],
  types: ['sub_frame']
}, [
  'blocking',
  'responseHeaders',
  // Modern Chrome needs 'extraHeaders' to see and change this header,
  // so the following code evaluates to 'extraHeaders' only in modern Chrome.
  (browser.webRequest as any).OnHeadersReceivedOptions.EXTRA_HEADERS,
].filter(Boolean)
);

browser.webRequest.onBeforeSendHeaders.addListener(
  (info) => {
    const headers = info.requestHeaders || [];
    const processedHeaders = headers.map((header) => {
      if (header.name.toLowerCase() === 'sec-fetch-dest' && header.value === 'iframe') {
        header.value = 'document';
      }
      if (header.name.toLowerCase() === 'sec-fetch-site' && header.value === 'cross-site') {
        header.value = 'same-origin';
      }
      return header;
    });
    console.log('onBeforeSendHeaders', info, processedHeaders);
    return { requestHeaders: processedHeaders };
  },
  {
    urls: [...urlsToPass],
    types: ['sub_frame']
  }, [
    'blocking',
    'requestHeaders',
    // Modern Chrome needs 'extraHeaders' to see and change this header,
    // so the following code evaluates to 'extraHeaders' only in modern Chrome.
    (browser.webRequest as any).OnHeadersReceivedOptions.EXTRA_HEADERS,
  ].filter(Boolean)
)
