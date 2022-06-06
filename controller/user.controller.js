const User = require('../model/index')
const bcrypt = require('bcrypt')
const config = require('config')
const {validateSchema} = require('../validator/user.validator')



const getLoginForm = (req,res)=>{
    res.render('login/layout')
}
const login = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const findUser = await User.findOne({email})
    if(!findUser){
        return res.render('singup/layout',{message:'user does not exist please sign up'})
    }
    const matchPassword = await bcrypt.compare(password,findUser.password)
    if(!matchPassword){
        return res.render('login/layout',{message:'Credentials Wrong'})
    }
    return res.render('user/layout')
}
const getSignupForm = (req,res)=>{
    res.render('signup/layout')
}
const signup =async (req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = validateSchema(fields)
    if(error){
        return res.render('signup/layout',{message:error.details[0].message})
    }
    const findUser = await User.findOne({email})
    if(findUser){
        return res.render('login/layout',{message:'User already exists please login'})
    }
    const hashedPassword = await bcrypt.hash(password,config.get('hashed.salt'))
    const createUser = await User.create({email,password:hashedPassword})
    return res.render('signup/layout',{message:'User Created'})

}

module.exports = {getLoginForm,login,getSignupForm,signup}