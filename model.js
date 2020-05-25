const axios = require("axios");

const BASE_URL = "https://pokeapi.co/api/v2/";

class Pokedex {
    constructor() {}

    async getPokemonById(id) {
        const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
        return {
            id: response.data.id,
            name: response.data.name,
            species: response.data.species,
        };
    }

    async getAllByTypeId(id) {
        const response = await axios.get(`${BASE_URL}/type/${id}`);
        return response.data.pokemon;
    }

    async searchItemsByName(name) {
        const response = await axios.get(`${BASE_URL}/item`);
        const results = response.data.results;
        return results.filter((res) => res.name.includes(name));
    }
}

module.exports = Pokedex;
