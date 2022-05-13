const mongoose = require('mongooose');
const Joi = require('joi');
const _ = require('lodash');
const jwt = require('jsonwebtoken')

const schema = new mongoose.schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        unique:true

    },
    email:{
        type:String,
        required:true,
        match:[/\s+@\s+\.\s+/,'email entered is invalid']
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    age:{
        type:Number,
        required:true,
        min:12


    }

})

const Customer  = mongoose.model('Customer',schema);

function validateCustomer(customer){
    const customerSchema = {
        name:Joi.string().required().min(5).unique(),
        email:Joi.string().required().email(),
        password:Joi.string().required(),
        age:Joi.min(12)
    };
    return Joi.validate(customer,customerSchema)
}

schema.methods.makeToken = function(req,res){
    const token = 
        jwt.sign({
            _id:this._id,
            name:this.name
        },"safe_oculus_key")
    
}

module.export = Customer;
module.export = validateCustomer;



