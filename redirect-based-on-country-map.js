addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
    return setRedirect(request)
}

const countryMap = {
    US: "https://redirect1.example.com", //URL1
    CA: "https://redirect2.example.com", //URL2
    FR: "https://redirect3.example.com"  //URL3
}

// Return different newfeatures URL for specific countries based on a map 
// Useful if more than two URLs
async function mapRedirect(request) {
    const country = request.cf.country
    
    if (country != null && country in countryMap) {
      const url = countryMap[country]
      return Response.redirect(url, 302)
    }
    // Else return old features for all other countries
    else {
      return await fetch(request)
    }
}

