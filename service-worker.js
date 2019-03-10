const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'css/bootstrap.min.css',
  'css/style.css',
  'js/jquery.min.js',
  'js/main.js',
  'js/jquery-qrcode.js',
  'js/qrcode.js',
  'fonts/Helvetica-Regular.otf',
  'fonts/Montserrat-Light.otf',
  'fonts/Montserrat-Regular.ttf',
  'fonts/Montserrat-SemiBold.otf',
  'feather-icon/feather.min.css',
  'img/scanner.png',
  'img/generator.png',
  'img/icon-128x128.png'
];

self.addEventListener('install', event => {
  console.log('Service worker install event :)');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});