const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const db = MongoClient.connect(url)

export default class Newsletter {
    constructor() {
        this._collection = db.leads
        this._id = null
        this._email = null
        this._name = null
    }

    init(email, name) {
        this._id = generateRandomUUID()
        this._email = email
        this._name = name
    }

    add() {
        return new Promise((resolve, reject) => {
            try {
                const {_id, _name, _email} = this
                if (typeof _id === 'string' && typeof _name === 'string' && name.length > 5 && typeof _email === 'string') {
                    this._collection.insertOne({"id": _id, "name": _name, "email": _email})
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