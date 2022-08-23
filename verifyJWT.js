const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    console.log("test")
    const authHeader = req.headers['x-access-token'];
    if (!authHeader) return res.sendStatus(404);
    //console.log(authHeader); // Bearer token

    jwt.verify(
        authHeader,
        "secret",
        (err, decoded) => {
            console.log(decoded)
            if (err) return res.sendStatus(403); //invalid token

            req.role = [decoded.data.role];
            console.log(req.role)
            next();
        }
    );
}

module.exports = verifyJWT