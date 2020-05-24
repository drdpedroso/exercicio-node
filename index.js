const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controller.js')
const middlewares = require('./middlewares.js')
const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(middlewares.log)
app.use(middlewares.checkAuthToken)

app.get('/products', controllers.getAllProducts);

app.get('/product/:id', controllers.getProductById);

app.post('/product', controllers.createProduct);

app.delete('/product/:id', controllers.deleteProductById);

app.put('/product/:id', controllers.editProductById);


app.listen(3000, () => {
    console.log("App listening on port 3000!");
});