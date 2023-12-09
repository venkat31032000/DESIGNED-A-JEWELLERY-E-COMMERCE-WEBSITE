const fs = require('fs');

let requestLogger = (req, res, next) => {
    let logMessage = "" + new Date() + " " + req.method + " " + req.url + "\n";
    fs.appendFile('./RequestLogger.txt', logMessage, (err) => {
        if (err) 
            return next(err);
    });
    next();
}

module.exports = requestLogger;