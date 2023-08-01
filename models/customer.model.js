// id, name, email,password,phoneNumber,country
// name - string, required
// email- string, required, unique
// password - string, required
// phoneNumber - string, required, unique
// country - string, required

import mongoose from "mongoose";
import bcrypt from 'bcrypt';

//define schema 
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'please add name']
    },
    email: {
        type: String,
        required: [true,'please add email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        pattern: [/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, 'Your password must include numbers and letters']
      },
    phoneNumber: {
        type: Number,
        required: [true, 'Please add a phone number'],
        minLength: 14[true, 'number is less than required'],
        maxLength: 14[true, 'number is less than required']
      },
    country: {
        type: String,
        required: [true,'please select country']
    }
}, {timestamps: true});

//hashing users password
customerSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
  
    next();
  });

//define the model
const customerModel = mongoose.model('customer', customerSchema);

// export the model
export default customerModel;