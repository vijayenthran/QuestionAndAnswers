'use strict';

const express = require('express');
const postRouter = express.Router();
const {Post} = require('./model');


postRouter.get('/post/:postId', (req, res, next) => {
    if (!Post.checkObjectId(req.params.postId)) {
        let err = new Error();
        err.reason = 'Request Error';
        err.statusCode = 500;
        err.detailMessage = `Post Id should be an ObjectId`;
        return next(err);
    }
    return Post.findOne({_id: req.params.postId})
        .lean()
        .populate('commentsList', {}, null, {sort: { createdAt: -1 }})
        .then(postdoc => res.status(200).json(postdoc))
        .catch(error => res.status(500).send(error));
});

postRouter.get('/:categoryId', (req, res, next) => {
    if (req.params.categoryId !== 'null') {
        if (!Post.checkObjectId(req.params.categoryId)) {
            let err = new Error();
            err.reason = 'Request Error';
            err.statusCode = 500;
            err.detailMessage = `Category Id should be an ObjectId`;
            return next(err);
        }else if(!req.query.skiplimit){
            let err = new Error();
            err.reason = 'Request Error';
            err.statusCode = 500;
            err.detailMessage = `skiplimit is missing`;
            return next(err);
        }
        return Post.find({categoryId: req.params.categoryId})
            .skip(Number(req.query.skiplimit))
            .limit(10)
            .sort('-createdAt')
            .lean()
            .then(postdocs => res.status(200).json(postdocs))
            .catch(error => res.status(500).send(error));
    } else {
        if(!req.query.skiplimit){
            let err = new Error();
            err.reason = 'Request Error';
            err.statusCode = 500;
            err.detailMessage = `skiplimit is missing`;
            return next(err);
        }
        return Post.find({})
            .skip(Number(req.query.skiplimit))
            .limit(10)
            .sort('-createdAt')
            .lean()
            .then(postdocs => res.status(200).json(postdocs))
            .catch(error => res.status(500).send(error));
    }
});

postRouter.post('/', (req, res) => {
    return Post.create(req.body)
        .then(postdocs => res.status(201).json(postdocs))
        .catch(error => res.status(500).send(error));
});

postRouter.put('/:postId', (req, res) => {
    if (!Post.checkObjectId(req.params.postId)) {
        let err = new Error();
        err.reason = 'Request Error';
        err.statusCode = 500;
        err.detailMessage = `PostId should be an ObjectId`;
        return next(err);
    }
    return Post.findOneAndUpdate({_id: req.params.postId}, {...req.body})// Fill in the Update Fields option.
        .then(updatedPostdoc => res.status(200).json(updatedPostdoc))
        .catch(error => res.status(500).json(error));
});



postRouter.delete('/:postId', (req, res) => {
    if (!Post.checkObjectId(req.params.postId)) {
        let err = new Error();
        err.reason = 'Request Error';
        err.statusCode = 500;
        err.detailMessage = `PostId should be an ObjectId`;
        return next(err);
    }
    return Post.remove({_id: req.params.postId})
        .then(deletedPostRes => res.status(200).end())
        .catch(error => res.status(500).send(error));
});

module.exports = {postRouter};
