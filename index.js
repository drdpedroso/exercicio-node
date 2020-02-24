const http = require("http");
const fs = require("fs");
const url = require("url");

const isEmailValid = (email = "") => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};

const isPasswordValid = (password = "") => {
    const regex = /\d+/g;
    return password.match(regex) && password.length >= 6;
};

const isFirstNameValid = (firstName = "") => {
    const regex = /^[a-zA-Z]*$/;
    return firstName.length > 3 && regex.test(firstName);
};

const isPhoneValid = (phone = "") => {
    const regex = /\+\d{2}\s\(\d{2}\)\s\d{4,5}-?\d{4}/g;
    return regex.test(phone);
};

const isTokenValid = (token = "") => {
    const regex = /^([a-zA-Z0-9 _-]+)$/;
    return token.length === 16 && regex.test(token);
};

const generateToken = () => {
    const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 16; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

const isUserInformationValid = (userInformation = {}) => {
    if (!isEmailValid(userInformation.email)) {
        return false;
    } else if (!isPasswordValid(userInformation.password)) {
        return false;
    } else if (!isFirstNameValid(userInformation.firstName)) {
        return false;
    } else if (!isPhoneValid(userInformation.phone)) {
        return false;
    }
    return true;
};

const server = http.createServer((request, response) => {
    if (request.url === "/signup" && request.method === "POST") {
        request.on("data", data => {
            const body = JSON.parse(data);
            if (isUserInformationValid(body)) {
                response.writeHead(200, "OK", { "Content-Type": "application/json" });
                const responseBody = JSON.stringify({ token: generateToken() });
                response.write(responseBody);
            } else {
                response.writeHead(400, "Bad Request", {
                    "Content-Type": "application/json"
                });
                const responseBody = JSON.stringify({ message: "Campos inválidos" });
                response.write(responseBody);
            }
            response.end();
        });
    } else if (request.url === "/simpsons") {
        if (isTokenValid(request.headers.authorization)) {
            response.writeHead(200, "OK", { "Content-Type": "application/json" });
            const responseBody = JSON.stringify({
                endpoints: ["/simpsons/list", "/simpsons/people/:id"]
            });
            response.write(responseBody);
        } else {
            response.writeHead(401, "Unauthorized", {
                "Content-Type": "application/json"
            });
            const responseBody = JSON.stringify({ message: "Token inválido!" });
            response.write(responseBody);
        }
        response.end();
    } else if (request.url === "/simpsons/list") {
        if (isTokenValid(request.headers.authorization)) {
            const fileContent = fs.readFileSync("simpsons.json");
            const parsedData = JSON.parse(fileContent);
            const first5Characters = parsedData.characters.slice(0, 5);
            response.writeHead(200, "OK", { "Content-Type": "application/json" });
            const responseBody = JSON.stringify({ characters: first5Characters });
            response.write(responseBody);
        } else {
            response.writeHead(401, "Unauthorized", {
                "Content-Type": "application/json"
            });
            const responseBody = JSON.stringify({ message: "Token inválido!" });
            response.write(responseBody);
        }
        response.end();
    } else if (request.url.includes("/simpsons/people/")) {
        if (isTokenValid(request.headers.authorization)) {
            const id = request.url.replace("/simpsons/people/", "");
            const fileContent = fs.readFileSync("simpsons.json");
            const parsedData = JSON.parse(fileContent);
            const character =
                parsedData.characters.find(item => item.id === id) || [];
            response.writeHead(200, "OK", { "Content-Type": "application/json" });
            const responseBody = JSON.stringify({ character: character });
            response.write(responseBody);
        } else {
            response.writeHead(401, "Unauthorized", {
                "Content-Type": "application/json"
            });
            const responseBody = JSON.stringify({ message: "Token inválido!" });
            response.write(responseBody);
        }
        response.end();
    } else if (request.url === "/tv") {
        if (isTokenValid(request.headers.authorization)) {
            response.writeHead(200, "OK", { "Content-Type": "application/json" });
            const responseBody = JSON.stringify({
                endpoints: ["/tv/search/shows?q=:term", "/tv/shows/:id"]
            });
            response.write(responseBody);
        } else {
            response.writeHead(401, "Unauthorized", {
                "Content-Type": "application/json"
            });
            const responseBody = JSON.stringify({ message: "Token inválido!" });
            response.write(responseBody);
        }
        response.end();
    } else if (request.url.includes("/tv/search/shows?q=")) {
        if (isTokenValid(request.headers.authorization)) {
            const parsedUrl = url.parse(request.url, true);
            const searchTerm = parsedUrl.query.q;
            http.get(
                "http://api.tvmaze.com/search/shows?q=" + searchTerm,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
                res => {
                    let data = "";
                    res.on("data", chunk => {
                        data += chunk;
                    });
                    res.on("end", () => {
                        const body = JSON.parse(data).slice(0, 5);
                        response.writeHead(200, "OK", {
                            "Content-Type": "application/json"
                        });
                        const responseBody = JSON.stringify({ shows: body });
                        response.write(responseBody);
                        response.end();
                    });
                }
            );
        } else {
            response.writeHead(401, "Unauthorized", {
                "Content-Type": "application/json"
            });
            const responseBody = JSON.stringify({ message: "Token inválido!" });
            response.write(responseBody);
            response.end();
        }
    } else if (request.url.includes("/tv/shows/")) {
        if (isTokenValid(request.headers.authorization)) {
            const id = request.url.replace("/tv/shows/", "");
            http.get(
                "http://api.tvmaze.com/shows/" + id,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
                res => {
                    let data = "";
                    res.on("data", chunk => {
                        data += chunk;
                    });
                    res.on("end", () => {
                        const body = JSON.parse(data);
                        response.writeHead(200, "OK", {
                            "Content-Type": "application/json"
                        });
                        const responseBody = JSON.stringify({ show: body });
                        response.write(responseBody);
                        response.end();
                    });
                }
            );
        } else {
            response.writeHead(401, "Unauthorized", {
                "Content-Type": "application/json"
            });
            const responseBody = JSON.stringify({ message: "Token inválido!" });
            response.write(responseBody);
            response.end();
        }
    } else {
        response.writeHead(404, "Not Found");
        response.end();
    }
});

server.listen(3000);
