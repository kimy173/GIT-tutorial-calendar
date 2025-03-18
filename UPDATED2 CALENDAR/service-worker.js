const CACHE_NAME = 'calendar-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/styles/calendar.css',
    '/styles/mobile.css',
    '/app.js',
    '/utils/dateUtils.js',
    '/utils/calendarData.js',
    '/components/Header.js',
    '/components/LanguageSelector.js',
    '/components/CalendarType.js',
    '/components/Calendar.js',
    '/components/EventList.js',
    '/components/PrayerTimes.js',
    '/components/Panchang.js',
    '/components/QiblaCompass.js',
    '/components/PremiumFeature.js',
    '/components/PaymentModal.js',
    '/components/InstallPrompt.js',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
