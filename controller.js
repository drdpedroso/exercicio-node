const fs = require('fs');
const path = require('path');
const Cat = require('./model')

const generateRandomId = () => {
    return Math.floor(Math.random() * 300) + 1;
};

const newCatController = (req, res) => {
    const { name, age } = req.body;
    const id = generateRandomId()
    const rawView = fs.readFileSync(path.resolve(__dirname, 'success.html'), 'utf8')
    const model = new Cat()
    model.add(id, name, age).then(data => {
        res.send(rawView)
    })
}

const catsController = (req, res) => {
    const rawView = fs.readFileSync(path.resolve(__dirname, 'list.html'), 'utf8')
    const model = new Cat()
    model.getAll().then(data => {
        const content = data.reduce((prev, curr) => {
            return prev + `<div>${curr.name}</div>`;
        }, "");
        const view = rawView.replace('$list', content)
        res.send(view)
    })
}

const catController = (req, res) => {
    const {id} = req.params
    const rawView = fs.readFileSync(path.resolve(__dirname, 'details.html'), 'utf8')
    const model = new Cat()
    model.getCatById(id).then(data => {
        const content = data.reduce((prev, curr) => {
            return prev + `<div>${curr.name}</div>`;
        }, "");
        const view = rawView.replace('$list', content)
        res.send(view)
    })
}

module.exports = {
    newCatController, catController, catsController
}