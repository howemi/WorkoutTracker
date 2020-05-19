 
var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/test', async (req, res) => {
  res.send('test');
});

module.exports = router;
