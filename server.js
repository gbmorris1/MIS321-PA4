const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'lfmerukkeiac5y5w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'vl41tjc2q6o0v2co',
    password: 'ypa3x12v6jn5y5wf',
    database: 'v5dmrbpsnfz194es'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// API Endpoints

// Get all exercises
app.get('/exercises', (req, res) => {
    db.query('SELECT * FROM exercise WHERE deleted = FALSE', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/exercises', (req, res) => {
    const exercise = {
        id: req.body.id,  
        activityType: req.body.activityType, 
        distanceMiles: req.body.distanceMiles, 
        dateCompleted: req.body.dateCompleted, 
        Pinned: req.body.Pinned
    };
    const query = 'INSERT INTO exercise SET ?';
    db.query(query, exercise, (err) => {
        if (err) throw err;
        res.json({ status: 'Exercise added' });
    });
});

// Soft delete an exercise
app.put('/exercises/:id/pin', (req, res) => {
    const { pinned } = req.body;
    const query = 'UPDATE exercise SET Pinned = ? WHERE id = ?';
    db.query(query, [pinned, req.params.id], (err) => {
        if (err) throw err;
        res.json({ status: 'Exercise pinned/unpinned' });
    });
});


app.put('/exercises/:id/delete', (req, res) => {
    const query = 'UPDATE exercise SET deleted = TRUE WHERE id = ?';
    db.query(query, [req.params.id], (err) => {
        if (err) throw err;
        res.json({ status: 'Exercise soft deleted' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
