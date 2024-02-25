var express = require('express');
var router = express.Router();
const connection = require('../lib/connect');

router.get('/notes/user/:id', (req, res) => {
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

router.post('/notes/add', (req, res) => {

    const insertQuery = 'INSERT into notes (User, Title, Content) VALUES (?, ?, ?)';
    const selectQuery = 'SELECT LAST_INSERT_ID() as NoteID'; 

    connection.query(insertQuery, [req.body.User, req.body.Title, req.body.Content], (err, data) => {
        if (err) {
            console.log('err', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        connection.query(selectQuery, (err, data) => {
            if (err) {
                console.log('err', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            
            const noteID = data[0].NoteID; 
            return res.status(201).json({ message: 'User added successfully', NoteID: noteID });
        });
    });
})

router.delete('/notes/delete', (req, res) => {

    const deleteQuery = 'DELETE FROM notes WHERE NoteID = ?'

    connection.query(deleteQuery, [req.body.NoteID], (err, data) => {
        if (err) {
            console.log('err', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        res.status(201).json({ message: 'Note has been deleted' });
    });
})

router.get('/notes/:id', (req, res) => {
    const selectQuery = 'SELECT * FROM notes WHERE NoteID = ?';
    
    connection.query(selectQuery, [req.params.id], (err, data) => {
        console.log(data)
        if (err) console.log('err', err);
        
        if (data.length < 1) {
            return res.json({ message: 'Data not found'})
        }
        res.json(data);
      })
})

router.patch('/notes/update', (req, res) => {
    const updateQuery = 'UPDATE notes SET Title = ?, Content = ? WHERE NoteID = ?';
    
    connection.query(updateQuery, [req.body.Title, req.body.Content, req.body.NoteID], (err, data) => {
        console.log(data)
        if (err) console.log('err', err);
        
        res.json(data);
      })
})


module.exports = router;