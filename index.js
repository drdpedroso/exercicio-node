const http = require('http')

const server = http.createServer((request, response) => {
    if (request.url === '/list') {
        if (request.headers.authorization === "12345678") {
            response.writeHead(200, "OK", { "Content-Type": "application/json" })
            const responseBody = JSON.stringify({message: 'Tudo certo!'})
            response.write(responseBody)
        } else {
            response.writeHead(401, "Unauthorized", { "Content-Type": "application/json" })
            const responseBody = JSON.stringify({message: 'Token inválido!'})
            response.write(responseBody)
        }
        response.end()
    } else if (request.url === '/login' && request.method === 'POST') {
        request.on('data', function (chunk) {
            const body = JSON.parse(chunk)
            if (body.username && body.password) {
                response.writeHead(200, "OK", {"Content-Type": "application/json"})
                const responseBody = JSON.stringify({token: '1234abc', username: body.username})
                response.write(responseBody)
                response.end()
            }
        });
    }
})

server.listen(3000)

module.exports = {
    server: server
}


//curl --header "Content-Type: application/json" \
//   --request POST \
//   --data '{"username":"xyz","password":"xyz"}' \
//   http://localhost:3000/api/login