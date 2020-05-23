const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./User')

const Workout = db.define('workout', {
  workout_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  start_time: {
    type: Sequelize.DATE,
  },
  end_time: {
    type: Sequelize.DATE,
  }
})

// Workout.sync({force: true}).then(() => {
//   console.log('workout table ready')
// })

module.exports = Workout