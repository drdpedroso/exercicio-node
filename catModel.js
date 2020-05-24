const url = 'mongodb://127.0.0.1:27017'
const mongoClient = require("mongodb").MongoClient;
mongoClient.connect(url)
    .then(conn => global.conn = conn.db("animaldb"))
    .catch(err => console.log(err))

class Cat {
    constructor() {
        this._colletion =  global.conn.collection("cats")
        this._id = null
        this._name = null
        this._age = null
        this._ownerId = null
    }

    init(id, name, age, ownerId) {
        this._id = id
        this._name = name
        this._age = age
        this._ownerId = ownerId
    }

    getAll () {
        return new Promise( (resolve, reject) => {
            try {
                const cats = this._colletion.find().toArray()
                resolve(cats)
            } catch (e) {
                reject(e)
            }
        })
    }

    getCatById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const cat = await this._colletion.find({ id }).toArray()
                resolve(cat)
            } catch (e) {
                reject(e)
            }
        })
    }

    add({id, name, age, ownerId}) {
        return new Promise((resolve, reject) => {
            try {
                if (typeof id === 'string' && typeof name === 'string' && name.length > 5 && typeof age === 'number') {
                    this._colletion.insertOne({"id": id, "name": name, "age": age, "ownerId": ownerId})
                    resolve()
                } else {
                    throw new Error('Campos inválidos')
                }
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = Cat