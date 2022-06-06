const Joi = require('joi')

const validateSchema = (fields)=>{
    const userValidate = Joi.object({
        email:Joi.string().min(8).max(24).required(),
        password:Joi.string().min(8).max(24).required()
    })
    const {error,value} = userValidate.validate(fields)
    return {error,value}
}

module.exports = {validateSchema}