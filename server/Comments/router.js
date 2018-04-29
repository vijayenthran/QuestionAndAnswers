'use strict';

const express = require('express');
const commentsRouter = express.Router();
const {Comments} = require('./model');

commentsRouter.get('/:postId', (req, res, next) => {
    if (!Comments.checkObjectId(req.params.postId)) {
        let err = new Error();
        err.reason = 'Request Error';
        err.statusCode = 500;
        err.detailMessage = `Post Id should be an ObjectId`;
        return next(err);
    }
    return Comments.find({postId: req.params.postId})
        .lean()
        .then(commentDocs => res.status(200).json(commentDocs))
        .catch(error => res.status(500).send(error));
});

commentsRouter.post('/', (req, res) => {
    return Comments.create(req.body)
        .then(commentDoc => res.status(201).json(commentDoc))
        .catch(error => res.status(500).send(error));
});

commentsRouter.put('/:commentId', (req, res) => {
    if (!Comments.checkObjectId(req.params.commentId)) {
        let err = new Error();
        err.reason = 'Request Error';
        err.statusCode = 500;
        err.detailMessage = `Comment Id should be an ObjectId`;
        return next(err);
    }
    return Comments.updateOne({_id: req.params.commentId},{ $set: { comment: req.body.comment }}) // Fill in the Update Fields option.
        .then(updatedCommentDoc => res.status(200).json(updatedCommentDoc))
        .catch(error => res.status(500).send(error))
});

commentsRouter.delete('/:commentId', (req, res) => {
    if (!Comments.checkObjectId(req.params.commentId)) {
        let err = new Error();
        err.reason = 'Request Error';
        err.statusCode = 500;
        err.detailMessage = `Comment Id should be an ObjectId`;
        return next(err);
    }
    return Comments.remove({_id: req.params.commentId}) // Fill in the Update Fields option.
        .then(deletedCommentRes => res.status(200).end())
        .catch(error => res.status(500).send(error));

});

module.exports = {commentsRouter};
