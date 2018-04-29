'use strict';

const mongoose = require('mongoose');
// const postsSchema = mongoose.Schema({
//     post: {type:String, required:true},
//     comments : {type: mongoose.Schema.Types.ObjectId, ref: 'Comments'},
//     likes : {type: mongoose.Schema.Types.ObjectId, ref: 'Likes'},
// },{timestamps: true});


const postsSchema = mongoose.Schema({
    postTitle: {type: String, required: true},
    postBody: {type: String, required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, required: true},
    categoryName: {type: String, required: true},
    commentsList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}],
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    userName: {type: String},
    likeCount: {type: Number}
}, {timestamps: true});

postsSchema.statics.checkObjectId = function (value) {
    return mongoose.Types.ObjectId.isValid(value);
};

const Post = mongoose.model('Posts', postsSchema);

module.exports = {Post};
