self.addEventListener('install', function(event) {
    console.log('Service worker installed');
    event.waitUntil(
        caches.open('rstrnt').then(function(cache) {
            //pre-caching few required files
            cache.addAll(['/',
                '/index.html',
                '/css/styles.css',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/restaurant.html'
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Service worker activated', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            } else {
                //caching dynamically as user visits pages for future offline use.
                return fetch(event.request).then(function(res) {
                    return caches.open('rstrnt').then(function(cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
                    });
                });
            }
        })
    );
});