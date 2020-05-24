const middlewares = require("./middlewares");

describe("Middlewares", () => {
    describe("Token validation", () => {
        it("When passing an invalid token, should return a 401 with a invalid token message in JSOn format", () => {
            const mockReq = {
                headers: { authorization: "334412321321lee" },
            };
            const mockRes = {
                status: jest.fn(),
                send: jest.fn(),
            };
            const mockNext = jest.fn();
            middlewares.checkAuthToken(mockReq, mockRes, mockNext);
            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.send).toHaveBeenCalledWith({ message: "Token inválido!" });
        });
        it("When passing a valid token, should call the next function", () => {
            const mockReq = {
                headers: { authorization: "1234567890123456" },
            };
            const mockRes = {
                status: jest.fn(),
                send: jest.fn(),
            };
            const mockNext = jest.fn();
            middlewares.checkAuthToken(mockReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalled();
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.send).not.toHaveBeenCalled();
        });
    });
    describe("Log", () => {
        it("When using the log middleware, should console log the date and teh request body", () => {
            const mockReq = {
                body: { key: "334412321321lee" },
            };
            const mockRes = {};
            const mockNext = jest.fn();
            const consoleSpy = jest.spyOn(console, "log");
            middlewares.log(mockReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalled();
            expect(consoleSpy).toHaveBeenCalledWith(mockReq.body, expect.any(Date));
        });
        it("When using the log middleware is called in a request without a body, should console log the date and the request body as undefined", () => {
            const mockReq = {};
            const mockRes = {};
            const mockNext = jest.fn();
            const consoleSpy = jest.spyOn(console, "log");
            middlewares.log(mockReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalled();
            expect(consoleSpy).toHaveBeenCalledWith(undefined, expect.any(Date));
        });
    });
});
