
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../data/userStore')
var bcrypt = require('bcryptjs')


router.post('/register', async ({ body }, res) => {
  // console.log(body.username)
  var newUser = User.build({
    username: body.username.toLowerCase(),
    password: body.password,
    first_name: body.firstName.charAt(0).toUpperCase() +
      body.firstName.slice(1),
    last_name: body.lastName.charAt(0).toUpperCase() +
      body.firstName.slice(1),
    email: body.email
  })
  newUser.save()
  .then(user => {
    console.log(user.get('username'))
    res.send('Success!', 200)
  })
  .catch(err => {
    console.log(err.errors[0].message)
    if(err.errors[0].path === 'username' &&
       err.errors[0].type === 'unique violation') {
        res.status(500).send('Username already taken')        
    } else {
      res.status(500).send('We could not sign you up at this time')
    } 
  })
});

router.post('/login', async ({ body }, res) => {
  console.log("Login Request for", body.username)
  res.send('test passed');

  User.findAll()
  .then(users => {
    console.log(...users)
  })
});

module.exports = router;
