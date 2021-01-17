const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./User')

const AuthToken = db.define('auth_token', {
  token_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  token: {
    type: Sequelize.STRING(32),
    unique: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
//    references: {
//      model: User,
//      key: 'user_id',
//    }
  },
  
})

// AuthToken.sync({force: true}).then(() => {
//   console.log('auth_token table ready')
// })

module.exports = AuthToken
