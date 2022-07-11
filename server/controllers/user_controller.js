'use strict'

import CryptoJS from 'crypto-js';
import date from 'date-and-time';
import { v4 as uuidv4  } from 'uuid';
import isEmpty from 'just-is-empty';
import { User } from '../models';
import helpers from '../helpers/util';


let {
  hashPassword,
  comparePasswords,
  createToken,
  errorResponse
} = helpers;


/**
  * @description -This method logins a user
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - user and accessToken
  */
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // ** test login ** //
        //password =CryptoJS.AES.encrypt(password, process.env.secretKey).toString();

        let bytes = CryptoJS.AES.decrypt(password, process.env.secretKey);
        let password_post = bytes.toString(CryptoJS.enc.Utf8);

        let dataUser = await User.findByUsername(username);
        if (isEmpty(dataUser)) {
          return errorResponse(res, 404, 'USR_04', 'user does not exist.', 'username'); 
        }

        let match = await comparePasswords(password_post, dataUser[0].password);
        
        if (match) {
            let user = dataUser[0];
            let token = createToken(user);
            
            res.status(200).json({
              token: token
            });
            
        } else {
            return errorResponse(res, 400, 'USR_01', 'data is invalid. user');
        }
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method logins a user by Social
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - user and accessToken
*/
const loginSocial = async (req, res) => {
  try {
    const { email } = req.body;

    let bytes = CryptoJS.AES.decrypt(email, process.env.secretKey);
    let email_post = bytes.toString(CryptoJS.enc.Utf8);

    let dataUser = await User.findByEmail(email_post);
    if (isEmpty(dataUser)) {
      return errorResponse(res, 404, 'USR_04', 'email does not exist.', 'email'); 
    }

    let match = true;
    
    if (match) {
      let user = dataUser[0];
      let token = createToken(user);
      
      res.status(200).json({
        token: token
      });
    } else {
      return errorResponse(res, 400, 'USR_01', 'data is invalid. user');
    }
  } catch (error) {
    return errorResponse(res, 500, 'Error', 'Internal Server Error');
  }
}


/**
  * @description -This method registers a user
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - uuid
  */
const postUser = async (req, res) => {
    const { 
        username,
        password,
        fullname
    } = req.body;  
  
    try {
        let existingUser = await User.countByUsername(username);

        if (existingUser['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The username already exists.', 'username'); 
        }  
        
        let created_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
        let hashedPassword = await hashPassword(password);
        let uuid = uuidv4();

        let user = await User.create({
            uuid,
            username,
            password: hashedPassword,
            fullname,
            created_at,
            updated_at
        });

        return res.status(200).json(user);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method registers a user Social
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - uuid
*/
const postUserSocial = async (req, res) => {
  const { 
    fullname,
    email,
    provider
  } = req.body;  

  try {
    let existingUser = await User.countByEmail(email);

    if (existingUser['numrow'] > 0) {
      return errorResponse(res, 409, 'USR_04', 'The email already exists.', 'email'); 
    }  
    
    let created_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let uuid = uuidv4();

    let user = await User.create({
      uuid,
      fullname,
      email,
      provider,
      created_at,
      updated_at
    });

    return res.status(200).json(user);
  } catch (error) {
    return errorResponse(res, 500, 'Error', 'Internal Server Error');
  }
}


/**
  * @description -This method returns detail of user all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - user all
  */
const getUserAll = async (req, res) => {
    try {
      let data = await User.findAll();

      if (!data) {
        return errorResponse(res, 404, 'user_04', 'user does not exist.');
      }

      return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc User detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent User from the controller
  * @returns {object} - User detail
  */
const getUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
      let uuid = bytes.toString(CryptoJS.enc.Utf8);
  
      if (!uuid) {
        return errorResponse(res, 400, 'user_01', 'id is required', 'id');
      }

      let data = await User.findOne(uuid);
  
      if (data == '') {
        return errorResponse(res, 404, 'user_04', 'user does not exist.');
      }
  
      return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a User's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - User
  */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let uuid = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            fullname,
            email,
            line_id,
            facebook_id,
            status 
        } = req.body;  
  
        let existingUser =  await User.countByUUID(uuid);

        if (existingUser['numrow'] == 0) {
            return errorResponse(res, 404, 'user_04', 'user does not exist.'); 
        }  
      
        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");  
  
        let data = await User.update(uuid, {
            fullname,
            email,
            line_id,
            facebook_id,
            status, 
            updated_at
        });
  
        return res.status(200).json(data); 
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent user from the controller
  * @returns {array} - removes user
  */
const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
      let uuid = bytes.toString(CryptoJS.enc.Utf8);
  
      let existingUser =  await User.countByUUID(uuid);

      if (existingUser['numrow'] == 0) {
        return errorResponse(res, 404, 'user_01', 'No user found', 'id'); 
      }  

      let countWork = await User.countWork(uuid);

      if (countWork['numrow'] > 0) {
        let status = 'N';
        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");  

        await User.update(uuid, {
            status, 
            updated_at
        });
      } else {
        await User.destroy(uuid);
      }
  
      return res.status(204).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
  loginUser,
  loginSocial,
  postUser,
  postUserSocial,
  getUserAll,
  getUser,
  updateUser,
  deleteUser
} 