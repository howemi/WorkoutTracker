 
var express = require('express');
var router = express.Router();
var request = require('request');
var Workout = require('../../data/models/Workout')

var Auth = require('../../util/auth')

var mongoose = require("mongoose")
var conn = mongoose.connection

router.post('/workouts', (req, res) => {
    Auth.checkAuthToken(req, (err, userId) => {
        if (err) {
            res.status(403).send()
        } else {
            var newWorkout = {
                user_id: userId,
                name: req.body.name,
                start_time: new Date().getTime(),
                end_time: null,
                workout_id: Math.random()
            }
            conn.collection('workouts').insertOne(newWorkout, function(err, workout) {
                if (err) {
                    throw err
                }
                else {
                    let work = workout.ops[0]
                    res.send( {work} )
                }
            })
        }
    })
})

router.get('/workouts', (req, res) => {
    Auth.checkAuthToken(req, (err, userId) => {
        if (err) {
            res.status(403).send()
        } else {
            conn.collection('workouts').find({user_id: userId}).toArray()
                .then(workouts => {
                    let rev = workouts.reverse()
                    res.send(rev) //TODO sort list
                })
        }
    })
})

router.get('/exercises/:workoutId', (req, res) => {
    Auth.checkAuthToken(req, (err, userId) => {
        if (err) {
            res.status(403).send()
        } else {
            let id = parseFloat(req.params.workoutId)
            conn.collection('exercises').find({workout_id: id}).toArray()
                .then( exercises => {
                    res.send(exercises)
                })
        }
    })
})

router.post('/exercises', (req, res) => {
    Auth.checkAuthToken(req, (err, userId) => {
        if (err) {
            res.status(403).send()
        } else {
            var newExercise = {
                workout_id: req.body.workoutId,
                exercise_id: Math.random(),
                name: req.body.newExercise.name,
                type: req.body.newExercise.type,
                reps: req.body.newExercise.reps,
                seconds: req.body.newExercise.seconds,
                weight: req.body.newExercise.weight,
            }
            conn.collection('exercises').insertOne(newExercise, function(err, exer) {
                if (err) {
                    throw err
                }
                else {
                    let exercise = exer.ops[0]
                    res.send( exercise )
                }
            })
        }
    })
})

router.post('/exercises/delete', (req, res) => {
    Auth.checkAuthToken(req, (err, userId) => {
        if (err) {
            res.status(403).send()
        } else {
            conn.collection('exercises').deleteOne({exercise_id: req.body.exerciseId}, function(err, exer) {
                if (err) {
                    throw err
                }
                else {
                    res.send( 'OK' )
                }
            })
        }
    })
})

router.post('/exercises/update', (req, res) => {
    Auth.checkAuthToken(req, (err, userId) => {
        if (err) {
            res.status(403).send()
        } else {
            conn.collection('workouts').findOne({user_id: userId, workout_id: req.body.workout_id}, function(err, work) {
                if (err) {
                    throw err
                }
                else {
                    let workout = work
                    if (!!workout) {
                        conn.collection('exercises').findOneAndUpdate({exercise_id: req.body.exercise_id},
                            {
                                $set: {
                                    name: req.body.name,
                                    type: req.body.type,
                                    reps: req.body.reps,
                                    seconds: req.body.seconds,
                                    weight: req.body.weight
                                }
                            },
                            {returnOriginal: false},
                            function(err, exercise) {
                                if (err) {
                                    throw err
                                }
                                else {
                                    res.send(exercise.value)
                                }
                        })
                    }
                    else {
                        res.status(403).send()
                    }
                }
            })
        }
    })
})



module.exports = router;
