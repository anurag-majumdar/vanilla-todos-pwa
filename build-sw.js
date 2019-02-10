const glob = require('glob');
const fs = require('fs');

const dest = 'dist/sw.js';
const staticAssetsCacheName = 'todo-assets-v6';
const dynamicCacheName = 'todo-dynamic-v6';

let staticAssetsCacheFiles = glob
    .sync('dist/**/*')
    .map((path) => {
        return path.slice(5);
    })
    .filter((file) => {
        if (/\.gz$/.test(file)) return false;
        if (/sw\.js$/.test(file)) return false;
        if (!/\.+/.test(file)) return false;
        return true;
    });

staticAssetsCacheFiles = [...staticAssetsCacheFiles];

const stringFileCachesArray = JSON.stringify(staticAssetsCacheFiles);

const serviceWorkerScript = `var staticAssetsCacheName = '${staticAssetsCacheName}';
var dynamicCacheName = '${dynamicCacheName}';

self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
      caches.open(staticAssetsCacheName).then(function (cache) {
        cache.addAll([
            '/',
            ${stringFileCachesArray.slice(1, stringFileCachesArray.length - 1)}
        ]
        );
      }).catch((error) => {
        console.log('Error caching static assets:', error);
      })
    );
  });

  self.addEventListener('activate', function (event) {
    if (self.clients && clients.claim) {
      clients.claim();
    }
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.filter(function (cacheName) {
            return (cacheName.startsWith('todo-')) && cacheName !== staticAssetsCacheName;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
        ).catch((error) => {
            console.log('Some error occurred while removing existing cache:', error);
        });
      }).catch((error) => {
        console.log('Some error occurred while removing existing cache:', error);
    }));
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
          .then((fetchResponse) => {
              return cacheDynamicRequestData(dynamicCacheName, event.request.url, fetchResponse.clone());
          }).catch((error) => {
            console.log(error);
          });
      }).catch((error) => {
        console.log(error);
      })
    );
  });

  function cacheDynamicRequestData(dynamicCacheName, url, fetchResponse) {
    return caches.open(dynamicCacheName)
      .then((cache) => {
        cache.put(url, fetchResponse.clone());
        return fetchResponse;
      }).catch((error) => {
        console.log(error);
      });
  }
`;

fs.writeFile(dest, serviceWorkerScript, function(error) {
    if (error) return;
    console.log('Service Worker Write success');
});
