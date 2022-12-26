const User = require("../models/userModel");
const requestError = require("../helpers/RequestError");
const jwt = require("jsonwebtoken");

const JWT_KEY = "abracagurchik";

const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization) {
            throw requestError(401, "Unauthorized");
        }

        const [bearer, token] = req.headers.authorization.split(" ");
        if(bearer !== "Bearer" || !token) {
            throw requestError(401, "Unauthorized");
        }

        try {
            const id = jwt.verify(token, JWT_KEY).id;
            const user = await User.findById(id);

            if(!user || user.token !== token) {
                throw requestError(401, "Unauthorized")
            }

            req.user = user;
        } catch (error) {
            throw requestError(401, "Unauthorized")
        }

        next();
        
    } catch (error) {
        next(error)
    }
}

module.exports = authMiddleware;