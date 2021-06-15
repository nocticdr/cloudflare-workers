addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
    
    const root_redirect = "sub.example.com"
    const url = new URL(request.url)
    const path = url.pathname
    //const protocol = url.protocol
    const destinationDomain = "https://" + root_redirect + path
    return Response.redirect(destinationDomain, 301)
    
    // Process request and return response
    const response = await fetch(request)
    return response
}