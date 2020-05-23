const Sequelize = require('sequelize')
const db = require('../db')

const Workout = db.define('workout', {
  workout_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  
})

// Workout.sync({force: true}).then(() => {
//   console.log('workout table ready')
// })

module.exports = Workout