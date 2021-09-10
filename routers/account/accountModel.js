const Sequelize = require('sequelize')
const instance = require('../../dataBase')

const columns = {
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: 'accounts',
    timestamps: true,
}

module.exports = instance.define('account', columns, options)