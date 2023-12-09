const fs = require('fs');

let errorLogger = (err, req, res, next) => {
    fs.appendFile('./ErrorLogger.txt', err.stack + "\n", (error) => {
        if (error) console.log("logging error failed");
    });
    if (err.status)
        res.status(err.status);
    else 
        res.status(500);
    res.json({ "message": err.message })
    next();
}

module.exports = errorLogger;