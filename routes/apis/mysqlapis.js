
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../../data/models/User')
var Workout = require('../../data/models/Workout')
var Exercise = require('../../data/models/Exercise')
var AuthToken = require('../../data/models/AuthToken')

const { Op } = require('sequelize')

var Auth = require('../../util/auth')
var bcrypt = require('bcryptjs')

router.get('/workouts', (req, res) => {
  Auth.checkAuthToken(req, (err, userId) => {
    if (err) {
      res.status(403).send()
    } else {
      Workout.findAll({
        where: { user_id: userId },
        order: [
          ['workout_id', 'DESC']
        ]
      })
        .then(workouts => {
          res.send(workouts)
        })
        .catch(err => {
          throw err
        })
    }
  })
})

router.get('/exercises/:workoutId', (req, res) => {
  Auth.checkAuthToken(req, (err, userId) => {
    if (err) {
      res.status(403).send()
    } else {
      Exercise.findAll({
        where: {
          workout_id: req.params.workoutId
        }
      })
        .then(exercises => {
          res.send(exercises)
        })
        .catch(err => {
          throw err
        })
    }
  })
})

router.post('/exercises', (req, res) => {
  Auth.checkAuthToken(req, (err, userId) => {
    if (err) {
      res.status(403).send()
    } else {
      var newExercise = Exercise.build({
        workout_id: req.body.workoutId,
        name: req.body.newExercise.name,
        type: req.body.newExercise.type,
        reps: req.body.newExercise.reps,
        seconds: req.body.newExercise.seconds,
        weight: req.body.newExercise.weight,
      })
      newExercise.save()
        .then(exercise => {
          res.send(exercise)
        })
        .catch(err => {
          throw err
        })
    }
  })
})

router.post('/exercises/delete', (req, res) => {
  Auth.checkAuthToken(req, (err, userId) => {
    if (err) {
      res.status(403).send()
    } else {
      Exercise.destroy({
        where: {
          exercise_id: req.body.exerciseId
        }
      })
        .then(rows => {
          if (rows === 1) {
            res.send('OK')
          } else {
            res.status(500).send('exercise could not be deleted')
          }
        })
        .catch(err => {
          throw err
        })
    }
  })
})

router.post('/exercises/update', (req, res) => {
  Auth.checkAuthToken(req, (err, userId) => {
    if (err) {
      res.status(403).send()
    } else {
      Workout.findOne({
        where: {
          [Op.and]: [
            { workout_id: req.body.workout_id },
            { user_id: userId },
          ],
        }
      })
        .then(workout => {
          if (!!workout) {
            Exercise.findOne({
              where: {
                exercise_id: req.body.exercise_id
              }
            })
              .then(exercise => {
                exercise.name = req.body.name
                exercise.type = req.body.type
                exercise.reps = req.body.reps
                exercise.seconds = req.body.seconds
                exercise.weight = req.body.weight
                exercise.save()
                  .then(savedExercise => {
                    res.send(savedExercise)
                  })
                  .catch(err => {
                    throw err
                  })
              })
              .catch(err => {
                throw err
              })
          } else {
            res.status(403).send()
          }
        })
        .catch(err => {
          throw err
        })
    }
  })
})

router.post('/workouts', (req, res) => {
  Auth.checkAuthToken(req, (err, userId) => {
    if (err) {
      res.status(403).send()
    } else {
      var newWorkout = Workout.build({
        user_id: userId,
        name: req.body.name,
        start_time: new Date().getTime()
      })
      newWorkout.save()
        .then(workout => {
          res.send({ workout })
        })
        .catch(err => {
          throw err
        })
    }
  })
})

router.post('/register', ({ body }, res) => {
  Auth.hashPassword(body.password, 12, (err, hash) => {
    if (err) {
      // throw an error
      res.status(500).send()
    } else {
      // store the new hash in the database etc
      var newUser = User.build({
        username: body.username.toLowerCase(),
        password: hash,
        first_name: body.firstName.charAt(0).toUpperCase() +
          body.firstName.slice(1),
        last_name: body.lastName.charAt(0).toUpperCase() +
          body.firstName.slice(1),
        email: body.email
      })
      newUser.save()
        .then(user => {
          var newAuthToken = AuthToken.build({
            token: Auth.makeid(32),
            user_id: newUser.user_id
          })
          newAuthToken.save()
            .then(token => {
              console.log('Authentication successful for', body.username)
              res.send({ token: token.token })
            })
            .catch(err => {
              res.status(500).send('Server error')
            })
        })
        .catch(err => {
          console.error(err.errors[0].message)
          if (err.errors[0].path === 'username' &&
            err.errors[0].type === 'unique violation') {
            res.status(403).send('Username already taken')
          } else {
            res.status(500).send('We could not sign you up at this time')
          }
        })
    }
  })
});

router.post('/login', ({ body }, res) => {
  User.findOne({ where: { username: body.username.toLowerCase() } })
    .then(user => {
      if (user == null) {
        res.status(403).send('Could not find user');
      } else {
        Auth.compare(body.password,
          user.password.toString('binary'), (err, match) => {
            if (match) {
              var newAuthToken = AuthToken.build({
                token: Auth.makeid(32),
                user_id: user.user_id
              })
              newAuthToken.save()
                .then(token => {
                  console.log('Authentication successful for', body.username)
                  res.send({ token: token.token })
                })
                .catch(err => {
                  res.status(500).send('Server error')
                })
            } else {
              res.status(403).send('Invalid credentials')
            }
          })
      }
    })
    .catch(err => {
      console.error(err)
    })
});

router.post('/logout', ({ body }, res) => {
  AuthToken.destroy({
    where: {
      token: body.token
    }
  })
    .then(numRows => {
      res.send('OK')
    })
    .catch(err => {
      throw err
    })
})

module.exports = router;