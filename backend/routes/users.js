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

router.post('/login', (req, res) => {
  const checkEmail = req.body.email;
  const checkPassword = req.body.password;

  if (checkEmail != '' && checkPassword != '' && req.body.apiKey === process.env.API_KEY) {

  let query = 'SELECT * FROM users';

  connection.query(query, (err, data) => {
    if (err) console.log('err', err);
    
    let user = data.find(user => user.email === checkEmail)

    if (!user) {
      return res.status(401).json({message: 'User not found'});
    }

    if (checkPassword === user.password) {
      res.json({userId: user.userId})
    }
  })
  
 }
})

module.exports = router;
