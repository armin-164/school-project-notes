var express = require('express');
var router = express.Router();
const connection = require('../lib/connect');

router.get('/notes/:id', (req, res) => {
    let user = req.params.id;

    let query = 'SELECT * FROM notes WHERE User = ?';
    connection.query(query, [user], (err, data) => {
        if (err) console.log('err', err);
        
        if (data.length < 1) {
            return res.json({ message: 'Data not found'})
        }
        res.json(data);
      })

})

module.exports = router;