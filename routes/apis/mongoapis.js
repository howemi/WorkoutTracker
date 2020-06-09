 
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
                    console.log("WORKOUT: ", workout.ops[0])
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
            conn.collection('workouts').find({user_id: userId}, function(err, workouts) {
                console.log("WORKOUTS: ", workouts.ops)
                if (err) {
                    throw err
                }
                else {
                    res.send(workouts.ops) //TODO sort list
                }
            })
        }
    })
})


module.exports = router;
