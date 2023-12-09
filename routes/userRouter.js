const express = require('express');
const userRouter = express.Router();
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utilities/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({path:path.join(__dirname,'..','..','.env')});

const expressAsyncHandler = require('express-async-handler');

const User = require('../models/User');
const Address = require('../models/Address');

const genrateToken =(user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
    },'FoodZilla',{
        expiresIn:'30d',
    })
}
const isAuth=(req,res,next)=>{
    const authorization=req.headers.authorization
   
    if(authorization){
      const token = authorization.slice(7,authorization.length) //bearer token value
      jwt.verify(token,'FoodZilla',(err,decode)=>{
          if(err){
              res.status(401).send({message:err.message})
          }
          else{
              req.user=decode
              next()
          }
      })
    }
    else{
        res.status(401).send({message:'No token'})

    }
}

// post request for signining users
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) { // if password mateches
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                mobNo: user?.mobNo,
                token: genrateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid Email or Password' })
})
);

//post route for signup
userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        res.status(401).send({ message: 'User already exits' })

    } else {
        const newUser = User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });
        const user = await newUser.save();
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genrateToken(user),

        })
    }

})

);

userRouter.get('/shipping/:id', expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const address = await Address.find({ userId: id })
    res.send(address)
}))

//delete address
userRouter.delete('/address/:id', expressAsyncHandler(async (req, res) => {
    await Address.deleteOne({ _id: req.params.id })
    res.send({ id: req.params.id })
}))

//update address
userRouter.put('/address/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id)

    if (address) {
        address.name = req.body.name;
        address.mobNo = req.body.mobNo
        address.pinCode = req.body.pinCode
        address.address = req.body.address
        address.town = req.body.town
        address.state = req.body.state
        address.city = req.body.city
        const newAddress = await address.save()
        res.send(newAddress)
    }
    else {
        res.status(404).send({ message: 'Address not found !' })
    }
}))

//Add address
userRouter.post('/address', expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    const newAdress = Address({
        name: req.body.name,
        mobNo: req.body.mobNo,
        pinCode: req.body.pinCode,
        address: req.body.address,
        town: req.body.town,
        state: req.body.state,
        city: req.body.city,
        userId: req.body.userId
    })
    const address = await newAdress.save()
    res.send(address)

}))

//Update User
userRouter.put('/updateProfile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name;
        user.mobNo = req.body.mobNo
        const updatedUser = await user.save()
        res.send({
            _id: user._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            mobNo: updatedUser.mobNo,
            token: genrateToken(updatedUser),
        })
    }
    else {
        res.status(404).send({ message: 'User not found' })
    }


}))

// send password link
userRouter.post("/forgotPassword", async (req, res) => {
	try {
		const emailSchema = Joi.object({
			email: Joi.string().email().required().label("Email"),
		});
		const { error } = emailSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(409)
				.send({ message: "User with given email does not exist!" });

		let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const url = `http://localhost:3500/password-reset/${user._id}/${token.token}/`;
		await sendEmail(user.email, "Password Reset", url);

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// verify password reset link
userRouter.get("/password-reset/:id/:token", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//Update password
userRouter.post("/resetPassword/:id/:token", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		if (!user.verified) user.verified = true;

		const hashPassword = await bcrypt.hashSync(req.body.password, 10)

		user.password = hashPassword;
		await user.save();
		await token.remove();

		res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = userRouter;