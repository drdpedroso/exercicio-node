const request = require('supertest')

describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request('http://localhost:3000').get("/list").then(response => {
            expect(response.statusCode).toBe(401)
        })
    });
})