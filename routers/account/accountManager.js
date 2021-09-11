const Model = require('./accountModel')
require('../../dataBase/createTables')

module.exports = {

    getList () {
        return Model.findAll({ raw: true })
    },

    add (account) {
        return Model.create(account)
    },

    async mailExists (mail) {
        const exists = await Model.findOne({
            where: {
                mail: mail
            }
        })

        if (!exists) {
            return false
        }
        
        return true
    },

    async nameExists (name) {
        return true // This function are Unavalible
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