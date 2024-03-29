'use strict'

import CryptoJS from 'crypto-js';
import { AccountOld } from '../models';
import helpers from '../helpers/util';
import { eventLogger } from '../helpers/logsApp';

let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a AccountOld
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountOld code
  */
const postAccountOld = async (req, res) => {
    const { 
        account_id,
        account_old,
        account_old_name,
    } = req.body;  
  
    try {
        let existingAccount =  await AccountOld.countByAccount(account_id, account_old, account_old_name);

        if (existingAccount['numrow'] > 0) {
            //return 200 เช็คสถานะเอาหน้า web
            return errorResponse(res, 200, 'Account_01', 'The Account Code already exists.', 'Account'); 
        }  

        await AccountOld.create({
            account_id,
            account_old,
            account_old_name,
        });

        eventLogger.info('postAccountOld register old '+ account_old +' to system');

        return res.status(200).json(account_id);
    } catch (error) {
        eventLogger.error('postAccountOld Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error'+error);
    }
}


/**
  * @description -This method returns detail of Account all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - Account all
  */
 const getAccountOldAll = async (req, res) => {
    try {
        let data = await AccountOld.findAll();

        if (!data) {
            return errorResponse(res, 404, 'Account_04', 'Account does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountOldAll Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc AccountOld detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountOld from the controller
  * @returns {object} - AccountOld detail
  */
 const getAccountOldOne = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let account_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!account_id) {
            return errorResponse(res, 400, 'Account_01', 'id is required', 'id');
        }

        let data = await AccountOld.findOne(account_id);

        if (data == '') {
            return errorResponse(res, 404, 'AccountOld_04', 'AccountOld does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountOldOne Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}

/**
  * @description -This method updates a AccountOld's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - AccountOld
  */
 const updateAccountOld = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let account_old_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            account_id,
            account_old,
            account_old_name
        } = req.body;  
  
        let existingAccount =  await AccountOld.countByID(account_old_id);

        if (existingAccount['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountOld_04', 'AccountOld does not exist.'); 
        }  
      
        let data = await AccountOld.update(account_old_id, {
            account_id,
            account_old,
            account_old_name
        });

        eventLogger.info('updateAccountOld update detail account_old_id:'+ account_old_id);
  
        return res.status(200).json(data); 
    } catch (error) {
        eventLogger.error('updateAccountOld Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes AccountOld
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountOld from the controller
  * @returns {array} - removes AccountOld
  */
 const deleteAccountOld = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let account_old_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingAccountOld =  await AccountOld.countByID(account_old_id);

        if (existingAccountOld['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountOld_01', 'No AccountOld found', 'id'); 
        }  

        await AccountOld.destroy(account_old_id);

        eventLogger.info('deleteAccountOld delete account_old_id:'+ account_old_id)

        return res.status(200).json({"result":"success"});
    } catch (error) {
        eventLogger.error('deleteAccountOld Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postAccountOld,
    getAccountOldAll,
    getAccountOldOne,
    updateAccountOld,
    deleteAccountOld
} 