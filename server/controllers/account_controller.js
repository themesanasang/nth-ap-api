'use strict'

import CryptoJS from 'crypto-js';
import date from 'date-and-time';
import { Account } from '../models';
import helpers from '../helpers/util';


let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a Account
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - Account code
  */
const postAccount = async (req, res) => {
    const { 
        account,
        account_name,
        account_old,
        status
    } = req.body;  
  
    try {
        let existingAccountCode = await Account.countByCode(account);

        if (existingAccountCode['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The Account Code already exists.', 'Account Code'); 
        }  

        let existingAccountName = await Account.countByName(account_name);

        if (existingAccountName['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The Account Name already exists.', 'Account Name'); 
        } 

        let created_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");

        await Account.create({
            account,
            account_name,
            account_old,
            status,
            created_at,
            updated_at
        });

        return res.status(200).json(account);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of Account all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - Account all
  */
const getAccountAll = async (req, res) => {
    try {
        let data = await Account.findAll();

        if (!data) {
            return errorResponse(res, 404, 'Account_04', 'Account does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc Account detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent Account from the controller
  * @returns {object} - Account detail
  */
const getAccount = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.SECRET_KEY);
        let account_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!account_id) {
            return errorResponse(res, 400, 'Account_01', 'id is required', 'id');
        }

        let data = await Account.findOne(account_id);

        if (data == '') {
            return errorResponse(res, 404, 'Account_04', 'Account does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a Account's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - Account
  */
const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.SECRET_KEY);
        let account_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            account,
            account_name,
            account_old,
            status
        } = req.body;  
  
        let existingAccount =  await Account.countByID(account_id);

        if (existingAccount['numrow'] == 0) {
            return errorResponse(res, 404, 'Account_04', 'Account does not exist.'); 
        }  
      
        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");

        let data = await Account.update(account_id, {
            account,
            account_name,
            account_old,
            status,
            updated_at
        });
  
        return res.status(200).json(data); 
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes Account
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent Account from the controller
  * @returns {array} - removes Account
  */
 const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.SECRET_KEY);
        let account_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingAccount =  await Account.countByID(account_id);

        if (existingAccount['numrow'] == 0) {
            return errorResponse(res, 404, 'Account_01', 'No Account found', 'id'); 
        }  

        let countWork = await Account.countWork(account_id);

        if (countWork['numrow'] > 0) {
            let status = 'N';
            let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss"); 
            
            await Account.update(account_id, {
                status, 
                updated_at
            });
        } else {
            await Account.destroy(account_id);
        }

        return res.status(204).json();
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postAccount,
    getAccountAll,
    getAccount,
    updateAccount,
    deleteAccount
} 