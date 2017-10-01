
const CACHE_NAME = 'oec-review-site';
const urlsToCache = [
  '/',
  '1.html',
  '2.html',
  '3.html',
  '4.html',
  '5.html',
  '6.html',
  '7.html',
  '8.html',
  '9.html',
  '10.html',
  '11.html',
  '12.html',
  '13.html',
  '14.html',
  '15.html',
  '16.html',
  '17.html',
  '18.html',
  '19.html',
  '20.html',
  '21.html',
  '22.html',
  '23.html',
  '24.html',
  '25.html',
  '26.html',
  '27.html',
  '28.html',
  '29.html',
  '30.html',
  '30.html',
  '31.html',
  '32.html',
  '33.html',
  '34.html',
  '35.html',
  '36.html'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});