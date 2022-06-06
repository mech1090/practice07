const User = require('../model/index')
const bcrypt = require('bcrypt')
const config = require('config')



const getLoginForm = (req,res)=>{
    res.render('login/layout')
}
const login = (req,res)=>{}
const getSignupForm = (req,res)=>{
    res.render('signup/layout')
}
const signup =async (req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const findUser = await User.findOne({email})
    if(findUser){
        return res.render('login/layout',{message:'User already exists please login'})
    }
    const hashedPassword = await bcrypt.hash(password,config.get('hashed.salt'))
    const createUser = await User.create({email,password:hashedPassword})
    return res.render('signup/layout',{message:'User Created'})

}

module.exports = {getLoginForm,login,getSignupForm,signup}