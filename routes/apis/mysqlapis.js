
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../../data/models/User')
var Workout = require('../../data/models/Workout')
var Exercise = require('../../data/models/Exercise')
var AuthToken = require('../../data/models/AuthToken')

var Auth = require('../../util/auth')
var bcrypt = require('bcryptjs')


router.post('/register', async ({ body }, res) => {
  
  Auth.hashPassword(body.password, 12, (err, hash) => {
    if (err) {
      // throw an error
      res.status(500).send()
    } else {
      // store the new hash in the database etc
      console.log('password:', body.password, 'hash', hash)
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
          console.log(newUser.get('username'))
          var newAuthToken = AuthToken.build({
            token: Auth.makeid(32),
            user_id: newUser.user_id
          })
          newAuthToken.save()
          .then(token => {
            console.log('Authentication successful for', body.username)
            res.send({ token: token })
          })
          .catch(err => {
            res.status(500).send('Server error')
          })
        })
        .catch(err => {
          console.log(err.errors[0].message)
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

router.post('/login', async ({ body }, res) => {
  console.log("Login Request for", body.username)
  User.findOne({ where: { username: body.username.toLowerCase() } })
    .then(user => {
      if (user == null) {
        res.status(403).send('Could not find user');
      } else {
        console.log(body.password,
          user.password.toString('binary'))
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
                res.send({ token: token })
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
      console.log(err)
    })
});

module.exports = router;
