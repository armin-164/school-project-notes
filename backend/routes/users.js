var express = require('express');
var router = express.Router();
const connection = require('../lib/connect');

/* GET users listing. */
router.get('/', (req, res) => {
 connection.connect((err) => {
  if (err) console.log('str', err);

  let query = 'SELECT * FROM users';

  connection.query(query, (err, data) => {
    if (err) console.log('err', err);
    res.json(data);
  })
 })
})

module.exports = router;
