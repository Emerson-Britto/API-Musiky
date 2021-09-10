const Sequelize = require('sequelize')
const config = require('config')

//var mysql = require('mysql')
//const instance = mysql.createConnection(config.get('mysql.connectionString'))

const instance = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.user'),
    config.get('mysql.password'),
    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
)

module.exports = instance