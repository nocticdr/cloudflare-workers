/**
 * Gets the cookie with the name from the request headers
 * @param {Request} request incoming Request
 * @param {string} name of the cookie to get
 */

 addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    let cookies = request.headers.get("Cookie") || ""
    if (cookies.includes("returning=true")) {
      // User has been here before. Just pass request through.
      return fetch(request)
    }
    else {
    // Make the headers mutable by re-constructing the Request.
    // request = new Request(request)
    // request.headers.set("cache-control", "max-age=1800")
    // var url = new URL(request.url)
    // return Response.redirect('https://en.azri.ml/landing.html', 303)
    // URL is set up to respond with dummy HTML
    // let response = await fetch(request)
  
    // // Make the headers mutable by re-constructing the Response.
    // response = new Response(response.body, response)
    const URL = "https://example.com"
  
    let response = await fetch(URL, request)
    response = new Response(response.body, response)
    //response.headers.delete('expires')
    response.headers.set("Set-Cookie", "returning=true")
  
    return response
    }
    // request = await fetch(request)
    // var url = new URL(request.url)
    // //response = new Response(request.body, request)
    // res = new Response.redirect(url,302)
    // return res
    // response = new Response(request.body, request)
  
    // return response
    //return new Response("No cookie with name: " + cookie)
  }
  
  
  
  