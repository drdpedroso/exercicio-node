const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const controllers = require('./controller')
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/cats", controllers.catsController)
app.post("/cat/:id", controllers.catController);
app.post("/cat/new", controllers.newCatController);

app.listen(3000, function () {
    console.log("Ouvindo a porta 3000!");
});
