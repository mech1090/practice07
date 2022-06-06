const User = require('../model/index')


const findEntry = (fields)=>{
    return User.findOne(fields)
}

const createEntry = (fields)=>{
    return User.create(fields)
}

module.exports = { findEntry,createEntry}