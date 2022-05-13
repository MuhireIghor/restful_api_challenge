const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const  {Customer, validateCustomer} = require("../Models/user.model");

const userRegister = async (req,res)=>{
try{
    const customer = new Customer(
        _.pick(req.body,[
            "email","password","name"
        ])
    );
    await customer.save();

if(!customer){
    res.send('Unable to create user');

}


    const salt =  await bcrypt.genSalt(20);
    let hashed = await bcrypt.hash(customer.password,salt);

    const validatePassword = async function(){
        const password = await bcrypt.compare(customer.password,hashed);
        if (!password){
            res.send('Invalid email or password')
        }


    }
    const validateEmail = ()=>{
        if
    }

}
catch(ex){
    res.send(ex.message);
}
    
}


