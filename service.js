const Cat = require('./catModel')
const Owner = require('./model')

const add = async (cat, owner) => {
    try {
        const catModel = new Cat()
        const ownerModel = new Owner()
        await ownerModel.add(owner)
        await catModel.add({...cat, ownerId: owner.id})
        return true
    } catch (e) {
       throw new Error(e.message)
    }

}

module.exports = {add}