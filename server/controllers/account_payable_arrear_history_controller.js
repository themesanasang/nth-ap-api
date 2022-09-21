'use strict'

import CryptoJS from 'crypto-js';
import { AccountPayableArrearHistory } from '../models';
import helpers from '../helpers/util';
import { eventLogger } from '../helpers/logsApp';


let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a AccountPayableArrearHistory
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountPayableArrearHistory code
  */
const postAccountPayableArrearHistory = async (req, res) => {
    const { 
        account_payable_history_id,
        ap_code,
        arrear_date,
        amount,
        uuid_created,
        paid,
        paid_amount,
        paid_date,
        uuid_complete
    } = req.body;  
  
    try {
       
        await AccountPayableArrearHistory.create({
            account_payable_history_id,
            ap_code,
            arrear_date,
            amount,
            uuid_created,
            paid,
            paid_amount,
            paid_date,
            uuid_complete
        });

        eventLogger.info('postAccountPayableArrearHistory register account_payable_history_id '+ account_payable_history_id +' to system');

        return res.status(200).json({"result":"success"});
    } catch (error) {
        eventLogger.error('postAccountPayableArrearHistory Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc AccountPayableArrear count
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountPayableArrear from the controller
  * @returns {object} - AccountPayableArrear count
  */
 const getCountAccountPayableArrearHistory = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let ap_code = bytes.toString(CryptoJS.enc.Utf8);

        if (!ap_code) {
            return errorResponse(res, 400, 'AccountPayableArrear_01', 'code is required', 'id');
        }
       
        let existingAccountPayableArrear =  await AccountPayableArrearHistory.countByAPCode(ap_code);

        return res.status(200).json(existingAccountPayableArrear['numrow']);
    } catch (error) {
        eventLogger.error('getCountAccountPayableArrearHistory Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}



/**
  * @description -This method get doc AccountPayableArrear detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountPayableArrear from the controller
  * @returns {object} - AccountPayableArrear detail
  */
const getAccountPayableArrearHistory = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let account_payable_history_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!account_payable_history_id) {
            return errorResponse(res, 400, 'AccountPayableArrear_01', 'account_payable_history_id is required', 'account_payable_history_id');
        }

        let data = await AccountPayableArrearHistory.findOne(account_payable_history_id);

        if (data == '') {
            return errorResponse(res, 404, 'AccountPayableArrear_04', 'AccountPayableArrear does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountPayableArrearHistory Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}




/**
  * @description -This method removes AccountPayableArrear
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountPayableArrear from the controller
  * @returns {array} - removes AccountPayableArrear
  */
 const deleteAccountPayableArrearHistory = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let account_payable_history_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingAccountPayableArrear =  await AccountPayableArrearHistory.countByID2(account_payable_history_id);

        if (existingAccountPayableArrear['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountPayableArrear_01', 'No AccountPayableArrear found', 'id'); 
        }  

        await AccountPayableArrearHistory.destroyByID2(account_payable_history_id);

        eventLogger.info('deleteAccountPayableArrearHistory delete account_payable_history_id:'+ account_payable_history_id)

        return res.status(200).json({"result":"success"});
    } catch (error) {
        eventLogger.error('deleteAccountPayableArrearHistory Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}



/**
  * @description -This method removes AccountPayableArrear
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountPayableArrear from the controller
  * @returns {array} - removes AccountPayableArrear
  */
 const deleteAccountPayableArrearByAPHistory = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let ap_code = bytes.toString(CryptoJS.enc.Utf8);

        let existingAccountPayableArrear =  await AccountPayableArrearHistory.countByAPCode(ap_code);

        if (existingAccountPayableArrear['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountPayableArrear_01', 'No AccountPayableArrear found', 'id'); 
        }  

        await AccountPayableArrearHistory.destroyByAP(ap_code);

        eventLogger.info('deleteAccountPayableArrearByAPHistory delete ap_code:'+ ap_code)

        return res.status(200).json({"result":"success"});
    } catch (error) {
        eventLogger.error('deleteAccountPayableArrearByAPHistory Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postAccountPayableArrearHistory,
    getCountAccountPayableArrearHistory,
    getAccountPayableArrearHistory,
    deleteAccountPayableArrearHistory,
    deleteAccountPayableArrearByAPHistory
} 