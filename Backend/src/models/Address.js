const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobNo:{
        type:Number,
        required:true,
    },
    pinCode:{
        type:Number,
        required:true
    },
    address:{
       type:String,
       required:true
    },
    town:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true, 
    },
    city:{
        type:String,
        required:true, 
    },
    userId:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Address',addressSchema)