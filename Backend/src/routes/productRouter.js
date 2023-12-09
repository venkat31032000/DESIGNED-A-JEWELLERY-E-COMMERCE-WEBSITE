const express = require('express');
const productRouter = express.Router();
const expressAsyncHandler = require('express-async-handler');

const Product = require('../models/Product');
const Wishlist = require('../models/Wishlist');

// const stripe = require('stripe')('sk_test_51MCwj2L0wTDAd1EX3i2qWiNsyBv4BBfMnCpHdu7e0B2WZwUvc1G9fALZ0zo1SBprywq3Bl0O1IppanvSS9Ded8rj00uLe9RJuN');
const stripe = require('stripe')('sk_test_51OKxNpBoutZ0TyZ6FKblu0RAobeP8wZrob0bLwK78ZUqUHTch1KjTMLphHUDH90hmKh5PmBPJQvXra9WbHYTbV2000iSYLWDod');

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization

    if (authorization) {
        const token = authorization.slice(7, authorization.length) //bearer token value
        jwt.verify(token, 'FoodZilla', (err, decode) => {
            if (err) {
                res.status(401).send({ message: err.message })
            }
            else {
                req.user = decode
                next()
            }
        })
    }
    else {
        res.status(401).send({ message: 'No token' })

    }
}

//Get all products by category
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.query.category }) //return all products
    res.send(products)
}));

//Get All products
productRouter.get('/getAllProducts', expressAsyncHandler(async (req, res) => {
    const products = await Product.find() //return all products
    res.send(products)
}));

//Search product
productRouter.get('/search', expressAsyncHandler(async (req, res) => {
    let regEx = new RegExp(req.query.name, 'i');
    const serachedProducts = await Product.find({ name: regEx })
    if (serachedProducts) {
        res.send(serachedProducts)

    } else {
        res.status(402).send({ message: 'Opps No product found!!' })
    }
}))

//Add to Wishlist
productRouter.post('/wishlist', isAuth, expressAsyncHandler(async (req, res) => {
    const item = await Wishlist.findOne({ product: req.body._id });
    if (item) {
        res.status(409).send({ message: 'Item Already exits' });
    }
    else {
        const newItem = new Wishlist({
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            rating: req.body.rating,
            description: req.body.description,
            userId: req.user._id,
            product: req.body._id
        })
        const wishlistItem = await newItem.save();
        res.send(wishlistItem)
    }
}))

//Add product
productRouter.post('/add-product', expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
        type: req.body.type,
        countInStock: req.body.countInStock
    })
    await newProduct.save();
    const products = await Product.find()
    res.send(products)
}))

//Update product
productRouter.put('/update-product/:id', expressAsyncHandler(async (req, res) => {
    await Product.findByIdAndUpdate({ _id: req.params.id }, {countInStock: req.body.countInStock})
    const products = await Product.find()
    res.send(products)
}))

//Get products in wishlist
productRouter.get('/wishlist', isAuth, expressAsyncHandler(async (req, res) => {

    const items = await Wishlist.find({ userId: req.user._id });
    res.send(items)

}))

//Delete product from wishlist
productRouter.delete('/wishlist/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const items = await Wishlist.deleteOne({ productId: req.params.id });
    res.send(req.params.id)

}))

//Find the product by id
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product not found!' })
    }
}))

//Delete product by id
productRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    await Product.deleteOne({ _id: req.params.id })
    const products = await Product.find()
    res.send(products)
}))

//Get payment url
productRouter.get('/payment/:price', expressAsyncHandler(async (req, res) => {
    const product = await stripe.products.create({
        name: 'Jewellery',
      });
      const price = await stripe.prices.create({
        unit_amount: req.params.price+"00",
        currency: 'usd',
        product: product.id,
      });
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
    });
    if (paymentLink.url) {
        res.send(paymentLink.url)
    } else {
        res.status(404).send({ message: 'Oops! Some error occured!' })
    }
}))

module.exports = productRouter;