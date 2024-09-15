const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://avenster:IGF9EONYxYXR5FIl@login-details.plgmf.mongodb.net/?retryWrites=true&w=majority&appName=login-details')
.then(()=>{
    console.log("connected");
})
.catch(()=>{
    console.log("error");
})

const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collections",newSchema)
module.exports = collection