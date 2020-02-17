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
    }
})

server.listen(3000)
