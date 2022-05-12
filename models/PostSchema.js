const mongoose = require("mongoose") ;
const Schema = mongoose.Schema;

const Posts = new Schema({
    id:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    writer:{
        type:String,
        required:true
    }
})
var Post = mongoose.model("Posts", Posts);
module.exports = { Post };