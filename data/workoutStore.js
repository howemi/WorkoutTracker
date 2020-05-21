const Sequelize = require('sequelize')

const fs = require('fs')
var configFile = './db-config.json'
var config

try {
  config = require('confiFile')
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

const Workout = mysqlClient.define('workout', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  
})

Workout.sync().then(() => {
  console.log('mysql connection ready')
})

module.exports = Workout