const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = mongoose.Schema.Types;

const fileFolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: "Users",

    },
    sharedWith: [
    {
        type: ObjectId,
        ref: "Users"
    },
    ],
    type: {
        type: String,
        required: true
    },
    link: String,
    parentId :{
        type: ObjectId,
        ref: "FileFolder"
    },
    children :[
    {
        type: ObjectId,
        ref: "FileFolder"
        }
    ],
    metaData:{
        type: Object,
    },
},
{   timestamps: true    })




const fileFolderModel = mongoose.model("FileFolder", fileFolderSchema);

module.exports = { fileFolderModel };
