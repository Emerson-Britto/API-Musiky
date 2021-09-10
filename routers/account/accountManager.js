const Model = require('./accountModel')

module.exports = {
    getList () {
        return Model.findAll({ raw: true })
    },
    add (account) {
        return Model.create(account)
    },
    getById (id) {
        console.log('This function are Unavalible')
    },
    update (id, update) {
        console.log('This function are Unavalible')
    },
    remove (id) {
        console.log('This function are Unavalible')
    }
}