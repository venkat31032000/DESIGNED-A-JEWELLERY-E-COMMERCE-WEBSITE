const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    userId:{   
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }
    
})
module.exports = mongoose.model('Wishlist',wishListSchema)