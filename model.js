const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "sql10.freesqldatabase.com",
    user: "sql10333515",
    password: "Wrtv1TdvNx",
    port: "3306",
    database: "sql10333515",
})

class Cat {
    constructor() {
        this._id = null
        this._name = null
        this._age = null
    }

    init(id, name, age) {
        this._id = id
        this._name = name
        this._age = age
    }

    getAll () {
        const query = "SELECT * FROM cats";

        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    }

    getCatById(id) {
        const query = `SELECT * from cats WHERE id="${id}"`
        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    }

    add(id, name, age) {
        const query = `INSERT INTO cats (id, name, age) VALUES (${id}, "${name}", ${age})`

        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    }
}

module.exports = Cat