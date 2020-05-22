const Sequelize = require('sequelize')

const fs = require('fs')
var configFile = './db-config.json'
var config

try {
  config = require(configFile)
} catch (err) {
  config = {}
  console.log('Could not open file "' + configFile + '": ', err)
  console.log('see secret-config-sample.json for an example')
}

const mysqlClient = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql'
  }
)

const User = mysqlClient.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(60),
    allowNull: false,
    unique: true,
  },
  password: {
    type: 'BINARY(60)',
    allowNull: false,
  },
  first_name: Sequelize.STRING(60),
  last_name: Sequelize.STRING(60),
  email: Sequelize.STRING(100),
  
})

User.sync().then(() => {
  console.log('mysql connection ready')
})

module.exports = User