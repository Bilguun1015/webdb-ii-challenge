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

router.post('/',validateCar, (req, res) => {
    const carData = req.body;
    db('cars')
        .insert(carData)
        .then(ids => {
            db('cars').where({id: ids[0]})
            .then(newCarEntry => {
                res.status(201).json(newCarEntry);
            });
        })
        .catch(err => {
            console.log('Post err', err);
            res.status(500).json({message: 'Failed to store data'});
        });
});


//middleware

function validateCar(req, res, next) {
    const {VIN, Make, Model, Mileage, Transmission, Title} = req.body;
    if(!VIN && !Make && !Model && !Mileage && !Transmission && !Title ){
        return res.status(400).json({message: "missing required data"});
    }
    if(!VIN){
        return res.status(400).json({message: "include VIN"});
    }
    if(!Make){
        return res.status(400).json({message: "include make"});
    }
    if(!Model){
        return res.status(400).json({message: "include Model"});
    }
    if(!Mileage){
        return res.status(400).json({message: "include Mileage"});
    }
    if(isNaN(Mileage)){
        return res.status(400).json({message: "Mileage has to be numbers"});
    }
    if(!Transmission){
        return res.status(400).json({message: "include Transmission type"});
    }
    if(!Title){
        return res.status(400).json({message: "include title status"});
    }
    if(VIN.length > 128){
        return res.status(400).json({error: "VIN number must be less than 128 characters"});
    }
    next();
}

module.exports = router;

