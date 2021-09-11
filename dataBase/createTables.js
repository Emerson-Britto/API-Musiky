const models = [
    require('../routers/account/accountModel'),
]

console.log('CREATING TABLE')

async function createTable() {
    for (let counter = 0; counter < models.length; counter++) {
        const model = models[counter]
        await model.sync()
    }
}

 module.exports = createTable()