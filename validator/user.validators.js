const Joi = require("joi");
const signupSchema = Joi.object({
    firstName: Joi.string().required().minLength(2),
    phonenumber: Joi.number().required().minLength(11),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required()

});

const validatorSignupData =(data) =>{
    const {error, value} =signupSchema.validate(data);
    return{ err: error, value: value};
};
 

mpdule.exports = {validatorSignupData: validatorSignupData}