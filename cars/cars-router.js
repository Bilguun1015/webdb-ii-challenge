const express = require('express');
const db = require('../data/db-config.js');
const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Failed to retrieve cars'});
        });
});


module.exports = router;