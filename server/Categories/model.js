'use strict';

const mongoose = require('mongoose');
const categoriesSchema = mongoose.Schema({
   name : {type:String, required:true, unique:true}
},{timestamps: true});

const Category = mongoose.model('Categories', categoriesSchema);

module.exports = {Category};
