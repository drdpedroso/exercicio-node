const ProductModel = require("./model");

const getAllProducts = (req, res) => {
    const products = new ProductModel().getAll();

    res.status(200)
    res.json(products)
}

const getProductById = (req, res) => {
    const product = new ProductModel().getById(req.params.id);

    if (product === null) {
        res.status(404)
        return res.send({ message: 'Produto não encontrado' });
    }

    res.status(200)
    res.json(product);
}

const createProduct = (req, res) => {
    const { name, brand } = req.body;

    try {
        const newProduct = new ProductModel(name, brand);
        newProduct.add();

        res.status(200)
        res.json(newProduct);
    } catch (e) {
        res.status(500)
        res.send({ message: 'Algo deu errado' });
    }
}

const deleteProductById =  (req, res) => {
    try {
        const products = new ProductModel().delete(req.params.id);

        res.status(200)
        res.json(products);
    } catch (e) {
        res.status(500)
        res.send({ message: 'Algo deu errado' });
    }
}

const editProductById = (req, res) => {
    const { name, brand } = req.body;

    try {
        const products = new ProductModel(name, brand).addOrUpdate(req.params.id);

        res.status(200)
        res.json(products);
    } catch (e) {
        res.status(500)
        res.send({ message: 'Algo deu errado' });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById
}
