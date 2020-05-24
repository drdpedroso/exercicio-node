const fs = require('fs');

class Product {
    constructor(id, name, brand) {
        this.id = id || null;
        this.name = name;
        this.brand = brand;
    }

    getAll() {
        const rawData = fs.readFileSync('./products.json');
        const products = JSON.parse(rawData);

        return products;
    }

    getById(id) {
        const rawData = fs.readFileSync('./products.json');
        const product = JSON.parse(rawData)
            .find((product) => product.id === parseInt(id));

        return product;
    }

    add() {
        const rawData = fs.readFileSync('./products.json')
        const products = JSON.parse(rawData);

        this.id = products[products.length - 1].id + 1
        products.push(this);

        fs.writeFile('./products.json', JSON.stringify(products), 'utf8', (err) => {
            if (err) throw err;
            console.log('write file ok');
        });

        return this;
    }

    delete(id) {
        const rawData = fs.readFileSync('./products.json');
        const products = JSON.parse(rawData).filter(product => product.id !== parseInt(id));

        fs.writeFile('./products.json', JSON.stringify(products), 'utf8', (err) => {
            if (err) throw err;
            console.log('write file ok');
        });

        return products;
    }

    addOrUpdate(id) {
        const rawData = fs.readFileSync('./products.json');
        const products = JSON.parse(rawData);

        const product = products.find(product => product.id === parseInt(id));

        if (product) {
            product.name = this.name;
            product.brand = this.brand;
        } else {
            this.id = products[products.length - 1].id + 1;
            products.push(this);
        }

        fs.writeFile('./products.json', JSON.stringify(products), 'utf8', (err) => {
            if (err) throw err;
            console.log('write file ok');
        });

        return products;
    }
}

module.exports = Product;