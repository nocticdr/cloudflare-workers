addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
    return setRedirect(request)
}

// Return same newfeatures URL for specific countries based on a country list
// Useful if single URL applies for many countries 
async function setRedirect(request) {
    const country = request.cf.country
    var cSet = new Set(["US", 
                        "ES", 
                        "FR", 
                        "CA", 
                        "CZ"]);

    if (cSet.has(country)) {  
        return Response.redirect('https://redirect.example.com"', 302);
    }
    // Else return oldfeatures URL for all other countries
    else {
        return await fetch(request)
    }
}
