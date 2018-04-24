'use strict';

const mongoose = require('mongoose');
// const likesSchema = mongoose.Schema({
//     count: {type:String, required:true},
//     likeType : {type:String, required:true}
// },{timestamps: true});

const likesSchema = mongoose.Schema({
    count: {type:String, required:true},
    entityType : {type:String, required:true},
    entityId : {type:mongoose.Schema.Types.ObjectId, required:true}
},{timestamps: true});

const Likes = mongoose.model('Likes', likesSchema);

module.exports ={Likes};
