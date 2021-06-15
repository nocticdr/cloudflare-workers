addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
    return setRedirect(request)
}

// Return single newfeatures URL for a single country.
// Much simpler one if you only have one specific country to redirect.
async function singleRedirect(request) { 
    const country = request.cf.country
    if (country == 'US'){
        return Response.redirect('https://redirect.example.com', 302)
    }
    // Else return oldfeatures URL for all other countries
    else {
        return await fetch(request)
    }
}