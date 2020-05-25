const express = require("express");
const bodyParser = require("body-parser");
const controllers = require("./controller.js");
const middlewares = require("./middlewares.js");
const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(middlewares.checkAuthToken);

app.get("/pokemon/:id", controllers.getPokemonById);
app.get("/type/:id", controllers.getAllByTypeId);
app.get("/item/:term", controllers.searchItemsByName);

app.listen(3000, () => {
    console.log("App listening on port 3000!");
});
