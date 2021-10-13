console.log("Sw: Limpio");
const CACHE_NAME = 'cache-v1'

const CACHE_STATIC_NAME = 'static-v1'
const DYMAMIC_CACHE_NAME = 'dynamic-v1'
const CACHE_INMUTABLE_NAME = 'inmutable-v1'

function cleanCache(cacheName,sizeItems) {
    caches.open(cacheName)
        .then(cache =>{
            cache.keys().then(keys =>{
                console.log(keys)
                if (keys.length >= sizeItems) {
                    cache.delete(keys[0].then(()=>{
                        cleanCache(cacheName,sizeItems)
                    }))
                }
            })
            
        })
}

self.addEventListener('install',(event) =>{
    //Crear el caché y almacenar el APPSHELL
    const promesaCache = caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll([
                '/',
                'index.html',
                'css/page.css',
                'img/xiao.jpg',
                'js/app.js'
            ])
        })

    const promInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => {
            return cache.addAll([
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
                
            ])
        })
    event.waitUntil(Promise.all([promesaCache,promInmutable]))
})

self.addEventListener('fetch',(event) =>{

    //2. Caché cith network fallback
    //Busca en caché y si no lo encuentra va a la red
    const respuestaCache = caches.match(event.request)
        .then(resp =>{
            if (resp) {
                return resp
            }
            console.log("No esta en caché ",event.request.url);

            return fetch(event.request)
                .then(respNet => {
                    caches.open(DYMAMIC_CACHE_NAME)
                        .then(cache =>{
                            cache.put(event.request,respNet).then(ok =>{
                                cleanCache(DYMAMIC_CACHE_NAME,10)
                            })
                            
                        })
                    return respNet.clone()
                })
        })
    event.respondWith(respuestaCache)

    //1. Only Caché
    //event.respondWith(caches.match(event.request))
})