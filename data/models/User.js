const Sequelize = require('sequelize')
const db = require('../db')
const AuthToken = require('./AuthToken')
const Workout = require('./Workout')

const User = db.define('user', {
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

// User.sync({force: true}).then(() => {
//   console.log('user table ready')
// })

module.exports = User