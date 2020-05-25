const Pokedex = require("./model");

const getPokemonById = async (req, res) => {
    try {
        const pokemon = await new Pokedex().getPokemonById(req.params.id);
        if (!pokemon) {
            res.status(404);
            return res.send({ message: "Pokemon não encontrado" });
        }

        res.status(200);
        res.send(pokemon);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({ message: "Algo deu errado" });
    }
};

const getAllByTypeId = async (req, res) => {
    try {
        const types = await new Pokedex().getAllByTypeId(req.params.id);

        res.status(200);
        res.send(types);
    } catch (e) {
        res.status(500);
        res.json({ message: "Algo deu errado" });
    }
};

const searchItemsByName = async (req, res) => {
    const items = await new Pokedex().searchItemsByName(req.params.term);

    if (items.length === 0) {
        res.status(404);
        return res.send({ message: "Nenhum item não encontrado com esse termo" });
    }

    res.status(200);
    res.json(items);
};

module.exports = {
    getPokemonById,
    searchItemsByName,
    getAllByTypeId,
};
