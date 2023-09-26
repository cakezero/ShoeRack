const BNS = require('../models/bns');
const express = require('express');

const Shoe = BNS.Shoes;

const router = express.Router;

app.get('/shoe/:id', (req, res) =>{
    res.render('shoe', {id: req.params.id});
});

app.get('/add-shoe/:id', (req, res) =>{
    res.render('add_shoe', {id: req.params.id});
});

app.post('/add-shoe/:id', (req, res) =>{
    console.log(req.body)
    res.render('add_shoe', {qs: req.query});
});

app.get('/edit-shoe/:id', (req, res) =>{
    res.render('edit_shoe', {id: req.params.id});
});

app.post('/edit-shoe/:id', (req, res) =>{
    console.log(req.body)
    res.render('edit_brand', {qs: req.query});
});

module.exports = router;