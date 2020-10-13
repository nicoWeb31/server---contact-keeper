const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next) {
    //get token from header

    const token = req.header('x-auth-token');

    //if not token
    if(!token){
        return res.status(401).json({message: 'no token, authorization denied'})
    }

    try{

        const decode = jwt.verify(token, config.get('jwtSecret'));
        req.user = decode.user;
        next();

    }catch(err){

        res.status(401).json({message:'Token is not valid'})

    }
}