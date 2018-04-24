'use strict';

const mongoose = require('mongoose');
// const comments = mongoose.Schema({
//     comment: {type: String, required: true},
//     likes: {type: mongoose.Schema.Types.ObjectId, ref: 'Likes'}
// },{timestamps: true});


const commentsSchema = mongoose.Schema({
    comment: {type: String, required: true},
    postId: {type: mongoose.Schema.Types.ObjectId, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    userName :{type: String},
    likeCount : {type:Number}
},{timestamps: true});

commentsSchema.statics.checkObjectId = function (value) {
    return mongoose.Types.ObjectId.isValid(value);
};

const Comments = mongoose.model('Comments', commentsSchema);

module.exports ={Comments};
