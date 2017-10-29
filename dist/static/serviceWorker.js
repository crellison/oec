
const CACHE_NAME = 'oec-review-site';
const urlsToCache = [
  '/',
  'styles/style.css',
  'styles/paper.css',
  'styles/reveal.css',
  'styles/simple.css',
  'styles/zenburn.css',
  'plugin/highlight.js',
  'plugin/markdown.js',
  'plugin/marked.js',
  'plugin/notes.js',
  'head.min.js',
  'jquery-3.1.1.min.js',
  'reveal.js'
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