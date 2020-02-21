const http = require('http')
const https = require('https');

const isEmailValid = (email = '') => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(String(email).toLowerCase())
}

const isPasswordValid = (password = '') => {
    const regex = /\d+/g
    return password.match(regex) && password.length >= 6
}

const isFirstNameValid = (firstName = '') => {
    const regex = /^[a-zA-Z]*$/
    return firstName.length > 3 && regex.test(firstName)
}

const isPhoneValid = (phone) => {
    const regex = /\+\d{2}\s\(\d{2}\)\s\d{4,5}-?\d{4}/g;
    return regex.test(phone);
}

const generateToken = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = '';
    for (let i = 16; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const isUserInformationValid = (userInformation = {}) => {
    if (!isEmailValid(userInformation.email)) {
        return false
    } else if (!isPasswordValid(userInformation.password)) {
        return false
    } else if (!isFirstNameValid(userInformation.firstName)) {
        return false
    } else if (!isPhoneValid(userInformation.phone)) {
        return false
    }
    return true
}

const server = http.createServer((request, response) => {
    if (request.url === '/signup' && request.method === 'POST') {
        request.on('data', (data) => {
            const body = JSON.parse(data)
            if (isUserInformationValid(body)) {
                response.writeHead(200, "OK", { "Content-Type": "application/json" })
                const responseBody = JSON.stringify({ token: generateToken()})
                response.write(responseBody)
                response.end()
            } else {
                response.writeHead(400, "Bad Request", { "Content-Type": "application/json" })
                const responseBody = JSON.stringify({ message: 'Campos inválidos' })
                response.write(responseBody)
                response.end()
            }
        });
    } else {
        response.writeHead(404, "Not Found")
        response.end()
    }
})

server.listen(3000)
