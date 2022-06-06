const { string } = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:string,
        required:true
    },
    password:{
        type:string,
        required:true
    }
},
{
    collection:'practice07 user'
})

const User = mongoose.model('User',userSchema)

module.exports = User