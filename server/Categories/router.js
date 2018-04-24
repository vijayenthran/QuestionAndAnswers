'use strict';

const express = require('express');
const categoryRouter = express.Router();
const {Category} = require('./model');


categoryRouter.get('/', (req, res) => {
    return Category.find({})
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(500).json(error));
});

categoryRouter.post('/', (req, res) => {
    return Category.create(req.body)
        .then(docs => res.status(201).json(docs))
        .catch(error => res.status(500).json(error));
});


module.exports = {categoryRouter};
