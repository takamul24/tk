const CACHE_NAME = 'takamul-v4';
const BASE = self.registration.scope;
const ASSETS = [
  './',
  './index.html',
  './medical.html',
  './zuwar/app.html',
  './zuwar/screens/home.png',
  './zuwar/screens/menu.png',
  './zuwar/screens/dish.png',
  './zuwar/screens/reservation.png',
  './styles.css',
  './script.js',
  './logo-takamul.png',
  './favicon.svg',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});