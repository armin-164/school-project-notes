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

  // Only select one row where the Email matches the sent email
  let selectQuery = 'SELECT * FROM users WHERE Email = ? LIMIT 1';

  connection.query(selectQuery, [checkEmail], (err, data) => {
    if (err) console.log('err', err);
    

    if (!data[0].Email || checkPassword !== data[0].Password) {
      return res.status(401).json({message: 'User not found / Wrong password'});
    }

    res.json({userId: data[0].UserID})
  })
  
 }
})

router.post('/add', (req, res) => {

  connection.connect((err) => {
      if (err) {
          console.log('err', err);
          return res.status(500).json({ message: 'Internal server error' });
      }

      // Select every user in which the email matches the req.body.email
      const selectQuery = 'SELECT * FROM users WHERE Email = ?';
      connection.query(selectQuery, [req.body.email], (err, data) => {
          if (err) {
              console.log('err', err);
              return res.status(500).json({ message: 'Internal server error' });
          }

          // If the data isn't empty, it means that the user exists and they will be sent a 409 status.
          if (data.length > 0) {
              return res.status(409).json({ message: 'User already exists' });
          } 

          // Else insert the username, email and password into the users table, the userId will be automatically incremented.
          else {
              const insertQuery = 'INSERT INTO users (Username, Email, Password) VALUES (?, ?, ?)';
              connection.query(insertQuery, [req.body.username, req.body.email, req.body.password], (err, data) => {
                  if (err) {
                      console.log('err', err);
                      return res.status(500).json({ message: 'Internal server error' });
                  }
                  console.log('User added successfully');
                  return res.status(201).json({ message: 'User added successfully' });
              });
          }
      });
  });
});


module.exports = router;
