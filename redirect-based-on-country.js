addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
    const country = request.headers.get('cf-ipcountry')

    // Define redirections
    const languageRules = new Map([
        ["ES", 'es'],
        ["PA", 'es'],
        ["FR", 'fr']
    ])
    
    //Get value from key
    const languageCode = languageRules.get(country)

    // Redirect to language subdomain for custom countries set
    if (languageCode) {
        const root = ".domain.com"
        const url = new URL(request.url)
        const path = url.pathname
        const protocol = url.protocol
        const destinationDomain = protocol + "//" + languageCode + root + path
        return Response.redirect(destinationDomain, 301)
    }        
    
    // Redirect to english for any other domain
    else {
        const root = "en.domain.com"
        const url = new URL(request.url)
        const path = url.pathname;
        const protocol = url.protocol
        const destinationDomain = protocol + "//" + root + path
        return Response.redirect(destinationDomain, 301)
    }

    // Process request and return response
    const response = await fetch(request)
    return response
}