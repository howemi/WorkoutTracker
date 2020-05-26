const Sequelize = require('sequelize')
var configFile = './db-config.json'
var config

try {
  config = require(configFile)
} catch (err) {
  config = {}
  console.error('Could not open file "' + configFile + '": ', err)
  console.error('see secret-config-sample.json for an example')
}

module.exports = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql'
  }
)