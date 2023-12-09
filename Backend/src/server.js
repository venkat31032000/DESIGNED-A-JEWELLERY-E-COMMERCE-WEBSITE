const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");

const myConfig = require('./config');

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const requestLogger = require('./utilities/RequestLogger')
const errorLogger = require('./utilities/ErrorLogger')

const app = express();

mongoose.Promise = global.Promise;

const URL = myConfig.url;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((database) => {
    console.log("Connected to FoodZilla database");
}).catch((error) => {
    console.log(error.message);
        let err = new Error("Could not connect to database");
        err.status = 500;
        throw err;
})


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use('/api/users', userRouter);
app.use('/api/products',productRouter);

app.use(function (req, res) {
    return res.status(404).send({message: "Route not found"});
});

app.use(errorLogger);

app.listen(3000); 
console.log("Server Started at port 3000!");

module.exports = app;