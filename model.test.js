const fs = require("fs");
const ProductModel = require("./model.js");
const faker = require("faker");
jest.mock("fs");

describe("Product Model", () => {
    describe("Get all products", () => {
        test("When getting all products, should return an array with all the available products", () => {
            const mockData = JSON.stringify([
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
            ]);
            fs.readFileSync = jest.fn().mockReturnValue(mockData);
            const res = new ProductModel().getAll();
            expect(res).toStrictEqual(JSON.parse(mockData));
        });
    });
    describe("Get product by ID", () => {
        test("When sending ID 1 as parameter, should only the product with id 1 be returned", () => {
            const mockData = JSON.stringify([
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
            ]);
            fs.readFileSync = jest.fn().mockReturnValue(mockData);
            const res = new ProductModel().getById(1);
            expect(res).toStrictEqual(JSON.parse(mockData)[0]);
        });
        test("When sending ID 4 as parameter, should return undefined, since theres no product with id 4", () => {
            const mockData = JSON.stringify([
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
            ]);
            fs.readFileSync = jest.fn().mockReturnValue(mockData);
            const res = new ProductModel().getById(4);
            expect(res).toStrictEqual(undefined);
        });
        test("When sending no ID as parameter, should return undefined", () => {
            const mockData = JSON.stringify([
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
            ]);
            fs.readFileSync = jest.fn().mockReturnValue(mockData);
            const res = new ProductModel().getById();
            expect(res).toStrictEqual(undefined);
        });
    });
    describe("Add product", () => {
        test("When adding a new Product, should write in the file and return the created product", () => {
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
            fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
            fs.writeFile = jest.fn();

            const newProduct = new ProductModel(
                1,
                faker.commerce.productName(),
                faker.commerce.productMaterial()
            );
            const res = newProduct.add();
            mockData.push(newProduct);

            expect(fs.writeFile).toHaveBeenCalledWith(
                "./products.json",
                JSON.stringify(mockData),
                "utf8",
                expect.any(Function)
            );
            expect(res.id).toStrictEqual(4);
        });
        test("When something went wrong while writing the file, should throw an error", () => {
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
            fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
            let callback;
            jest.spyOn(fs, "writeFile").mockImplementation((path, data, type, cb) => {
                callback = cb;
            });
            const err = "something went wrong";

            const newProduct = new ProductModel(
                1,
                faker.commerce.productName(),
                faker.commerce.productMaterial()
            );
            newProduct.add();

            expect(fs.writeFile).toHaveBeenCalled();
            expect(() => callback(err)).toThrowError(err);
        });
    });
    describe("Delete product by id", () => {
        test("When deleting a product with ID 1, should write in the file the products without the one with ID 1 and the file content after deletion", () => {
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
            fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
            fs.writeFile = jest.fn();

            const deleteResponse = new ProductModel().delete(1);
            const expectedProductsAfterDeletion = [mockData[1], mockData[2]];

            expect(fs.writeFile).toHaveBeenCalledWith(
                "./products.json",
                JSON.stringify(expectedProductsAfterDeletion),
                "utf8",
                expect.any(Function)
            );
            expect(deleteResponse.length).toBe(2);
            expect(deleteResponse[0].id).toBe(2);
            expect(deleteResponse[1].id).toBe(3);
        });
        test("When something went wrong while writing the file, should throw an error", () => {
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
            fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
            let callback;
            jest.spyOn(fs, "writeFile").mockImplementation((path, data, type, cb) => {
                callback = cb;
            });
            const err = "something went wrong";

            const newProduct = new ProductModel(
                1,
                faker.commerce.productName(),
                faker.commerce.productMaterial()
            );
            newProduct.delete(1);

            expect(fs.writeFile).toHaveBeenCalled();
            expect(() => callback(err)).toThrowError(err);
        });
    });
    describe("Add Or Update Product by id", () => {
        test("When editing a product that exists, should write in the file and return all products after edition", () => {
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
            fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
            fs.writeFile = jest.fn();

            const newProduct = new ProductModel(1, "Novo Nome", "Nova marca");
            const response = newProduct.addOrUpdate(1);
            const expectedProductsAfterEdition = [
                newProduct,
                mockData[1],
                mockData[2],
            ];

            expect(fs.writeFile).toHaveBeenCalledWith(
                "./products.json",
                JSON.stringify(expectedProductsAfterEdition),
                "utf8",
                expect.any(Function)
            );
            expect(response[0].id).toStrictEqual(1);
            expect(response[0].name).toStrictEqual(newProduct.name);
            expect(response[0].brand).toStrictEqual(newProduct.brand);
        });
        test("When the product is not an edition, should add that product and save in the file and return all the products afeter insertion", () => {
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
            fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
            fs.writeFile = jest.fn();

            const newProduct = new ProductModel(
                1,
                faker.commerce.productName(),
                faker.commerce.productMaterial()
            );
            const res = newProduct.addOrUpdate(8);
            mockData.push(newProduct);

            expect(fs.writeFile).toHaveBeenCalledWith(
                "./products.json",
                JSON.stringify(mockData),
                "utf8",
                expect.any(Function)
            );
            expect(res.length).toBe(4);
            expect(res[3].id).toStrictEqual(4);
            expect(res[3].name).toStrictEqual(newProduct.name);
            expect(res[3].brand).toStrictEqual(newProduct.brand);
        });
        test("When something went wrong while writing the file, should throw an error", () => {
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
            fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
            let callback;
            jest.spyOn(fs, "writeFile").mockImplementation((path, data, type, cb) => {
                callback = cb;
            });
            const err = "something went wrong";

            const newProduct = new ProductModel(
                1,
                faker.commerce.productName(),
                faker.commerce.productMaterial()
            );
            newProduct.addOrUpdate(1);

            expect(fs.writeFile).toHaveBeenCalled();
            expect(() => callback(err)).toThrowError(err);
        });
    });
});
