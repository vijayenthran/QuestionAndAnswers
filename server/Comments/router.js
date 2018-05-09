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
    return Comments.findOneAndUpdate({_id: req.params.commentId}, {...req.body}) // Fill in the Update Fields option.
        .then(updatedCommentDoc => res.status(200).json(updatedCommentDoc))
        .catch(error => res.status(500).send(error))
});

// Delete either the comment Id or the Post Id using the request query Params.
commentsRouter.delete('/', (req, res) => {
    if (req.query.commentId) {
        if (!Comments.checkObjectId(req.query.commentId)) {
            let err = new Error();
            err.reason = 'Request Error';
            err.statusCode = 500;
            err.detailMessage = `Comment Id should be an ObjectId`;
            return next(err);
        }
        return Comments.remove({_id: req.query.commentId}) // Fill in the Update Fields option.
            .then(deletedCommentRes => res.status(200).end())
            .catch(error => res.status(500).send(error));
    } else if (req.query.postId) {
        if (!Comments.checkObjectId(req.query.postId)) {
            let err = new Error();
            err.reason = 'Request Error';
            err.statusCode = 500;
            err.detailMessage = `postId Id should be an ObjectId`;
            return next(err);
        }
        return Comments.remove({postId: req.query.postId}) // Fill in the Update Fields option.
            .then(deletedCommentRes => res.status(200).end())
            .catch(error => res.status(500).send(error));
    } else {
        let err = new Error();
        err.reason = 'Request Error';
        err.statusCode = 500;
        err.detailMessage = `postId Id or CommentId Query params is missing`;
        return next(err);
    }
});

//
// commentsRouter.delete('/:postId', (req, res) => {
//     if (!Comments.checkObjectId(req.params.postId)) {
//         let err = new Error();
//         err.reason = 'Request Error';
//         err.statusCode = 500;
//         err.detailMessage = `postId Id should be an ObjectId`;
//         return next(err);
//     }
//     return Comments.remove({postId: req.params.postId}) // Fill in the Update Fields option.
//         .then(deletedCommentRes => res.status(200).end())
//         .catch(error => res.status(500).send(error));
// });
module.exports = {commentsRouter};
