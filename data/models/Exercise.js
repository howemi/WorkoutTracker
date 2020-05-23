const Sequelize = require('sequelize')
const db = require('../db')

const Exercise = db.define('exercise', {
  exercise_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  
})

// Exercise.sync({force: true}).then(() => {
//   console.log('exercise table ready')
// })

module.exports = Exercise