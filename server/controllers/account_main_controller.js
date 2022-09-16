'use strict'

import CryptoJS from 'crypto-js';
import { AccountMain } from '../models';
import helpers from '../helpers/util';
import { eventLogger } from '../helpers/logsApp';

let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a AccountMain
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountMain code
  */
const postAccountMain = async (req, res) => {
    const { 
        acc_main_code,
        acc_main_name,
        status
    } = req.body;  
  
    try {
        let existingAccountMainCode = await AccountMain.countByCode(acc_main_code);

        if (existingAccountMainCode['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The AccountMain Code already exists.', 'AccountMain Code'); 
        }  

        let existingAccountMainName = await AccountMain.countByName(acc_main_name);

        if (existingAccountMainName['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The AccountMain Name already exists.', 'AccountMain Name'); 
        } 

        await AccountMain.create({
            acc_main_code,
            acc_main_name,
            status
        });

        eventLogger.info('postAccountMain register '+ acc_main_code +' to system');

        return res.status(200).json(gf_code);
    } catch (error) {
        eventLogger.error('postAccountMain Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of AccountMain all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountMain all
  */
const getAccountMainAll = async (req, res) => {
    try {
        let data = await AccountMain.findAll();

        if (!data) {
            return errorResponse(res, 404, 'AccountMain_04', 'AccountMain does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountMainAll Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc AccountMain detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountMain from the controller
  * @returns {object} - AccountMain detail
  */
const getAccountMain = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let acc_main_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!acc_main_id) {
            return errorResponse(res, 400, 'AccountMain_01', 'id is required', 'id');
        }

        let data = await AccountMain.findOne(acc_main_id);

        if (data == '') {
            return errorResponse(res, 404, 'AccountMain_04', 'AccountMain does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountMain Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a AccountMain's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - AccountMain
  */
const updateAccountMain = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let acc_main_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            acc_main_code,
            acc_main_name,
            status
        } = req.body;  
  
        let existingAccountMain =  await AccountMain.countByID(acc_main_id);

        if (existingAccountMain['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountMain_04', 'AccountMain does not exist.'); 
        }  
      
        let data = await AccountMain.update(acc_main_id, {
            acc_main_code,
            acc_main_name,
            status
        });

        eventLogger.info('updateAccountMain update detail acc_main_id:'+ acc_main_id);
  
        return res.status(200).json(data); 
    } catch (error) {
        eventLogger.error('updateAccountMain Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes AccountMain
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountMain from the controller
  * @returns {array} - removes AccountMain
  */
 const deleteAccountMain = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let acc_main_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingAccountMain =  await AccountMain.countByID(acc_main_id);

        if (existingAccountMain['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountMain_01', 'No AccountMain found', 'id'); 
        }  

        let countWork = await AccountMain.countWork(acc_main_id);

        if (countWork['numrow'] > 0) {
            let status = 'N';
          
            await AccountMain.update(acc_main_id, {
                status
            });
        } else {
            await AccountMain.destroy(acc_main_id);
        }

        eventLogger.info('deleteAccountMain delete acc_main_id:'+ acc_main_id)

        return res.status(200).json({"result":"success"});
    } catch (error) {
        eventLogger.error('deleteAccountMain Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postAccountMain,
    getAccountMainAll,
    getAccountMain,
    updateAccountMain,
    deleteAccountMain
} 