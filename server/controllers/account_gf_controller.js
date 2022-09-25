'use strict'

import CryptoJS from 'crypto-js';
import { AccountGF } from '../models';
import helpers from '../helpers/util';
import { eventLogger } from '../helpers/logsApp';

let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a AccountGF
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountGF code
  */
const postAccountGF = async (req, res) => {
    const { 
        gf_code,
        gf_name,
    } = req.body;  
  
    try {
        let existingAccountGFCode = await AccountGF.countByCode(gf_code);

        if (existingAccountGFCode['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The AccountGF Code already exists.', 'AccountGF Code'); 
        }  

        let existingAccountGFName = await AccountGF.countByName(AccountGF_name);

        if (existingAccountGFName['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The AccountGF Name already exists.', 'AccountGF Name'); 
        } 

        await AccountGF.create({
            gf_code,
            gf_name,
        });

        eventLogger.info('postAccountGF register '+ gf_code +' to system');

        return res.status(200).json(gf_code);
    } catch (error) {
        eventLogger.error('postAccountGF Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of AccountGF all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountGF all
  */
const getAccountGFAll = async (req, res) => {
    try {
        let data = await AccountGF.findAll();

        if (!data) {
            return errorResponse(res, 404, 'AccountGF_04', 'AccountGF does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountGFAll Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc AccountGF detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountGF from the controller
  * @returns {object} - AccountGF detail
  */
const getAccountGF = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let gf_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!gf_id) {
            return errorResponse(res, 400, 'AccountGF_01', 'id is required', 'id');
        }

        let data = await AccountGF.findOne(gf_id);

        if (data == '') {
            return errorResponse(res, 404, 'AccountGF_04', 'AccountGF does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountGF Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a AccountGF's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - AccountGF
  */
const updateAccountGF = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let gf_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            gf_code,
            gf_name,
        } = req.body;  
  
        let existingAccountGF =  await AccountGF.countByID(gf_id);

        if (existingAccountGF['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountGF_04', 'AccountGF does not exist.'); 
        }  
      
        let data = await AccountGF.update(gf_id, {
            gf_code,
            gf_name,
        });

        eventLogger.info('updateAccountGF update detail gf_id:'+ gf_id);
  
        return res.status(200).json(data); 
    } catch (error) {
        eventLogger.error('updateAccountGF Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes AccountGF
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountGF from the controller
  * @returns {array} - removes AccountGF
  */
 const deleteAccountGF = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let gf_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingAccountGF =  await AccountGF.countByID(gf_id);

        if (existingAccountGF['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountGF_01', 'No AccountGF found', 'id'); 
        }  

        let countWork = await AccountGF.countWork(gf_id);

        eventLogger.info('deleteAccountGF delete gf_id:'+ gf_id)

        if (countWork['numrow'] > 0) {
            return res.status(400).json({"result":"failure"});
        } else {
            await AccountGF.destroy(gf_id);
            return res.status(200).json({"result":"success"});
        }
    } catch (error) {
        eventLogger.error('deleteAccountGF Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of AccountGF use all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountGF use all
  */
 const getUseGF = async (req, res) => {
    try {
        let data = await AccountGF.getUseGF();

        if (!data) {
            return errorResponse(res, 404, 'AccountGF_04', 'AccountGF does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getUseGF Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postAccountGF,
    getAccountGFAll,
    getAccountGF,
    updateAccountGF,
    deleteAccountGF,
    getUseGF
} 