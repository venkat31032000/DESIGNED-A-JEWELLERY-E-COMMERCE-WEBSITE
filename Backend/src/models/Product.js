const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        default:"Veg"
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        default:5
    },
    description:{
        type:String,
        required:true,
    },
    countInStock:{
        type:Number,
        
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Product',productSchema)