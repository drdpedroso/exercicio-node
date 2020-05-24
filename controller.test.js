const ProductModel = require("./model");
const controllers = require("./controller");
const faker = require("faker");

describe("ProductController", () => {
    describe("Get all products", () => {
        test("When requesting all products, should return a JSON with all the available products", () => {
            const mockData = {
                data: [
                    new ProductModel(
                        1,
                        faker.commerce.productName(),
                        faker.commerce.productMaterial()
                    ),
                    new ProductModel(
                        2,
                        faker.commerce.productName(),
                        faker.commerce.productMaterial()
                    ),
                ],
            };
            const getAllSpy = jest
                .spyOn(ProductModel.prototype, "getAll")
                .mockReturnValueOnce(mockData);
            const mockReq = {};
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            controllers.getAllProducts(mockReq, mockRes);
            expect(getAllSpy).toBeCalledTimes(1);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith(mockData);
            getAllSpy.mockRestore();
        });
    });
    describe("Get product by id", () => {
        test("When requesting a product with the id 1, should return a single product with ID equal to 1", () => {
            const mockData = {
                data: [
                    new ProductModel(
                        1,
                        faker.commerce.productName(),
                        faker.commerce.productMaterial()
                    ),
                    new ProductModel(
                        2,
                        faker.commerce.productName(),
                        faker.commerce.productMaterial()
                    ),
                    new ProductModel(
                        3,
                        faker.commerce.productName(),
                        faker.commerce.productMaterial()
                    ),
                ],
            };
            const getByIdSpy = jest
                .spyOn(ProductModel.prototype, "getById")
                .mockReturnValueOnce(mockData.data[0]);
            const mockReq = { params: { id: 1 } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            controllers.getProductById(mockReq, mockRes);
            expect(getByIdSpy).toBeCalledTimes(1);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith(mockData.data[0]);
            getByIdSpy.mockRestore();
        });
        test("When requesting a product with the id 5, should return a 404 and a error message since the id does not exists", () => {
            const getByIdSpy = jest
                .spyOn(ProductModel.prototype, "getById")
                .mockReturnValueOnce(null);
            const mockReq = { params: { id: 5 } };
            const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            controllers.getProductById(mockReq, mockRes);
            expect(getByIdSpy).toBeCalledTimes(1);
            expect(mockRes.status).toBeCalledWith(404);
            expect(mockRes.send).toBeCalledWith({
                message: "Produto não encontrado",
            });
            getByIdSpy.mockRestore();
        });
        test("When requesting a product with no ID at all, should return a 404 and a error message", () => {
            const getByIdSpy = jest
                .spyOn(ProductModel.prototype, "getById")
                .mockReturnValueOnce(null);
            const mockReq = { params: {} };
            const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            controllers.getProductById(mockReq, mockRes);
            expect(getByIdSpy).toBeCalledTimes(1);
            expect(mockRes.status).toBeCalledWith(404);
            expect(mockRes.send).toBeCalledWith({
                message: "Produto não encontrado",
            });
            getByIdSpy.mockRestore();
        });
    });
    describe("Create Product", () => {
        test("When creating a product, should return a 200 with the create product", () => {
            const mockData = {
                id: null,
                name: faker.commerce.productName(),
                brand: faker.commerce.productMaterial(),
            };
            const addProductSpy = jest
                .spyOn(ProductModel.prototype, "add")
                .mockReturnValueOnce(mockData);
            const mockReq = { body: mockData };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            controllers.createProduct(mockReq, mockRes);
            expect(addProductSpy).toBeCalledTimes(1);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith(mockData);
            addProductSpy.mockRestore();
        });
        test("When something went wrong, should return a 500 with and error message", () => {
            const mockData = {
                id: null,
                name: faker.commerce.productName(),
                brand: faker.commerce.productMaterial(),
            };
            const addProductSpy = jest
                .spyOn(ProductModel.prototype, "add")
                .mockImplementation(() => {
                    throw new Error();
                });
            const mockReq = { body: mockData };
            const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            controllers.createProduct(mockReq, mockRes);
            expect(addProductSpy).toBeCalledTimes(1);
            expect(mockRes.status).toBeCalledWith(500);
            expect(mockRes.send).toBeCalledWith({ message: "Algo deu errado" });
            addProductSpy.mockRestore();
        });
    });
    describe("Delete Product by id", () => {
        test("When deleting a product with id 1, should return a 200 with the remaining products", () => {
            const mockData = [
                new ProductModel(
                    1,
                    faker.commerce.productName(),
                    faker.commerce.productMaterial()
                ),
                new ProductModel(
                    2,
                    faker.commerce.productName(),
                    faker.commerce.productMaterial()
                ),
                new ProductModel(
                    3,
                    faker.commerce.productName(),
                    faker.commerce.productMaterial()
                ),
            ];
            const deleteProductSpy = jest
                .spyOn(ProductModel.prototype, "delete")
                .mockReturnValueOnce([mockData[1], mockData[2]]);
            const mockReq = { params: { id: 1 } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            controllers.deleteProductById(mockReq, mockRes);
            expect(deleteProductSpy).toBeCalledTimes(1);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith([mockData[1], mockData[2]]);
            deleteProductSpy.mockRestore();
        });
        test("When deleting a product with a unexistent id, should return a 200 with an array with all the products and no deletion", () => {
            const deleteProductSpy = jest
                .spyOn(ProductModel.prototype, "delete")
                .mockReturnValueOnce([]);
            const mockReq = { params: { id: 5 } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            controllers.deleteProductById(mockReq, mockRes);
            expect(deleteProductSpy).toBeCalledTimes(1);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith([]);
            deleteProductSpy.mockRestore();
        });
        test("When something went wrong while deleting a product, should return a 500 with and error message", () => {
            const mockData = [
                new ProductModel(
                    1,
                    faker.commerce.productName(),
                    faker.commerce.productMaterial()
                ),
                new ProductModel(
                    2,
                    faker.commerce.productName(),
                    faker.commerce.productMaterial()
                ),
                new ProductModel(
                    3,
                    faker.commerce.productName(),
                    faker.commerce.productMaterial()
                ),
            ];
            const deleteProductSpy = jest
                .spyOn(ProductModel.prototype, "delete")
                .mockReturnValueOnce([mockData[1], mockData[2]]);
            const mockReq = { params: { id: 1 } };
            const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            controllers.deleteProductById(mockReq, mockRes);
            expect(deleteProductSpy).toBeCalledTimes(1);
            expect(mockRes.status).toBeCalledWith(500);
            expect(mockRes.send).toBeCalledWith({ message: "Algo deu errado" });
            deleteProductSpy.mockRestore();
        });
    });
    describe("Edit Product by id", () => {
        test("When editing a product with id 1, should return a 200 with an array with all the products and the one edited", () => {
            const mockData = [
                new ProductModel(
                    1,
                    faker.commerce.productName(),
                    faker.commerce.productMaterial()
                ),
                new ProductModel(
                    2,
                    faker.commerce.productName(),
                    faker.commerce.productMaterial()
                ),
                new ProductModel(
                    3,
                    faker.commerce.productName(),
                    faker.commerce.productMaterial()
                ),
            ];
            const editProductByIdSpy = jest
                .spyOn(ProductModel.prototype, "addOrUpdate")
                .mockReturnValueOnce(mockData);
            const mockReq = {
                params: { id: 1 },
                body: {
                    name: faker.commerce.productName(),
                    brand: faker.commerce.productMaterial(),
                },
            };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            controllers.editProductById(mockReq, mockRes);
            expect(editProductByIdSpy).toBeCalledTimes(1);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith(mockData);
            editProductByIdSpy.mockRestore();
        });
        test("When something went wrong while editing a product, should return a 500 with and error message", () => {
            const editProductByIdSpy = jest
                .spyOn(ProductModel.prototype, "addOrUpdate")
                .mockImplementation(() => {
                    throw new Error();
                });
            const mockReq = {
                params: { id: 1 },
                body: {
                    name: faker.commerce.productName(),
                    brand: faker.commerce.productMaterial(),
                },
            };
            const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            controllers.editProductById(mockReq, mockRes);
            expect(editProductByIdSpy).toBeCalledTimes(1);
            expect(mockRes.status).toBeCalledWith(500);
            expect(mockRes.send).toBeCalledWith({ message: "Algo deu errado" });
            editProductByIdSpy.mockRestore();
        });
    });
});
