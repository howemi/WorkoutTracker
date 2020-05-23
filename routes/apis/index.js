 
var express = require('express');
var router = express.Router();
var request = require('request');
var mysqlRouter = require('./mysqlapis');
var mongoRouter = require('./mongoapis')

router.use('/mysql', mysqlRouter);
router.use('/mongo', mongoRouter);

router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/test', async (req, res) => {
  res.send('test passed');
});

module.exports = router;
