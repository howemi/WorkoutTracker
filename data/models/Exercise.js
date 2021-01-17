const Sequelize = require('sequelize')
const db = require('../db')
const Workout = require('./Workout')

const Exercise = db.define('exercise', {
  exercise_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  workout_id: {
    type: Sequelize.INTEGER,
//    references: {
//      model: Workout,
//      key: 'workout_id',
//    }
  },
  set_id: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING(60),
  },
  type: {
    type: Sequelize.STRING(20),
  },
  reps: {
    type: Sequelize.INTEGER
  },
  seconds: {
    type: Sequelize.INTEGER,
  },
  weight: {
    type: Sequelize.INTEGER,
  },
  
})

// Exercise.sync({force: true}).then(() => {
//   console.log('exercise table ready')
// })

module.exports = Exercise
