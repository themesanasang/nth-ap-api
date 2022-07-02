const jwt = require('jsonwebtoken');
import helper from '../helpers/util';

const { errorResponse } = helper;

const verifyToken = (req, res, next) => {
    let token;

    if(!req.headers.authorization){
        return errorResponse(res, 401, 'AUT_01', 'Authorization code is empty', 'USER_KEY');
    }
    
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] !== 'Bearer') {
        return errorResponse(res, 401, 'AUT_02', 'The userkey is invalid', 'USER_KEY');
    } 

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } 
    
    jwt.verify(token, process.env.JWT_ENCRYPTION, (err, user) => {
      if (err) {
        return errorResponse(res, 401, 'AUT_02', 'The userkey is invalid', 'USER_KEY');
      }

      req.user = user;
      next();
    });
};

module.exports = verifyToken;