if(navigator.serviceWorker){
    
    navigator.serviceWorker.register('/sw.js')
}
/*if(window.caches){
    console.log('Tenemos caché');
    caches.open('prueba')

    caches.has('prueba').then((result)=>{
        console.log(result);
    })

    caches.open('cache-v1').then(
        (cache) =>{
            //cache.add('/index.html')

            cache.addAll([
                '/index.html',
                '/css/page.css',
                'img/xiao.jpg',
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l'
            ]).then(()=>{
                cache.delete('/css/page.css')
            })
        }
    )
}*/