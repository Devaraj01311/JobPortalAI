const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        default:""
    },
     appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }]
});

module.exports = mongoose.model('User',userSchema);