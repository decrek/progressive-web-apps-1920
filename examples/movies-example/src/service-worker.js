self.addEventListener('install', event => {
  console.log('Installing service Worker')
  self.skipWaiting()
});

self.addEventListener('activate', event => {
  console.log('Activating service worker')
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  console.log('Fetch event: ', event.request.url);
});

