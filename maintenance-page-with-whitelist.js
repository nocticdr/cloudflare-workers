addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

// IPs allowed to bypass the maintenance page
const white_list = [
    '1.1.1.1',   // MyIP1
    '2.2.2.2',   // MyIP2
    '3.3.3.3'    // MyIP3
];
// Custom IP for flexibility of having a custom response
// E.g. using automation to verify that the page is always under maintenance 
// Obviously it applies only if you're have scheduled maintenance. In your case, you can safely ignore this.
const custom_whitelist = "4.4.4.4" // MyCustomIP

async function handleRequest(request) {
    //return fetch(request)     //Uncomment this and comment below to allow everyone to access (to disable the maintenance page)
    return maintenance(request) 
}

async function maintenance(request) {

    let modifiedHeaders = new Headers()

    modifiedHeaders.set('Content-Type', 'text/html')
    modifiedHeaders.append('Pragma', 'no-cache')

    //Check requester IP and compare with whitelist, allow access if match.
    if (white_list.indexOf(request.headers.get("cf-connecting-ip")) > -1) {
        return fetch(request)
    }

    //Else, return maintenance page if IP is not whitelisted
    else {
        var current_ip = ""
        current_ip = request.headers.get("cf-connecting-ip")

        // Customise headers or other response properties for a custom IP. 
        // E.g. if using a powershell script to check if 100+ domains are properly set to maintenance, 
        // you would want the status to remain 200 instead of 503, which would result in a false negative.
        // Can be removed if not needed.
        if (current_ip == custom_whitelist){
            return new Response(maintenanceContent, {
            headers: modifiedHeaders
            })
        }

        else {
            // Return modified response. HTTP Code 503 is used for maintenance pages.
            return new Response(maintenanceContent, {
                status: 503,
                headers: modifiedHeaders
            })
        }
    }
}

// Place your maintenance page content in HTML below.
let maintenanceContent = `

<!doctype html>
<html lang="en">
    <head>
    </head>
    <body>
    </body>
</html>

`;