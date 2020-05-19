 
var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public/dist' });
});

module.exports = router;
