const mongoose = require("mongoose") ;
const Schema = mongoose.Schema;


const userSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

var Users = mongoose.model("User", userSchema);
module.exports = { Users, userSchema };