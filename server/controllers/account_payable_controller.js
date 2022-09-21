'use strict'

import CryptoJS from 'crypto-js';
import { nanoid } from 'nanoid';
import date from 'date-and-time';
import { AccountPayable } from '../models';
import helpers from '../helpers/util';
import { eventLogger } from '../helpers/logsApp';

let {
    errorResponse
} = helpers;



/**
  * @description -This method registers a AccountPayable
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountPayable code
  */
const postAccountPayable = async (req, res) => {
    const { 
        payable_date,
        round_date_start,
        round_date_end,
        item_id,
        department_sub_id,
        book_number,
        delivery_note_number,
        receive_amount,
        amount,
        bill_date,
        pay_date,
        payment_voucher,
        invoice_no,
        pay_amount,
        limit_day,
        comment,
        complete,
        uuid
    } = req.body;  
  
    try {
        let ap_code = nanoid(15);
        let data_date = date.format(new Date(), "YYYY-MM-DD");
       
        let complete_date = null;
        if (complete == 'Y') {
            complete_date = date.format(new Date(), "YYYY-MM-DD");
        }

        let created_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");

        await AccountPayable.create({
            ap_code,
            payable_date,
            data_date,
            round_date_start,
            round_date_end,
            item_id,
            department_sub_id,
            book_number,
            delivery_note_number,
            receive_amount,
            amount,
            bill_date,
            pay_date,
            payment_voucher,
            invoice_no,
            pay_amount,
            limit_day,
            comment,
            complete,
            complete_date,
            uuid,
            created_at,
            updated_at
        });

        eventLogger.info('postAccountPayable register ap_code '+ ap_code +' to system');

        return res.status(200).json(ap_code);
    } catch (error) {
        eventLogger.error('postAccountPayable Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}



/**
  * @description -This method Restore a AccountPayable
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - Restore AccountPayable code
*/
const postRestoreAccountPayable = async (req, res) => {
    const { 
        ap_code,
        data_date,
        payable_date,
        round_date_start,
        round_date_end,
        item_id,
        department_sub_id,
        book_number,
        delivery_note_number,
        receive_amount,
        amount,
        bill_date,
        pay_date,
        payment_voucher,
        invoice_no,
        pay_amount,
        limit_day,
        comment,
        complete,
        complete_date,
        uuid,
        created_at,
        updated_at
    } = req.body;  
  
    try {
        await AccountPayable.create({
            ap_code,
            data_date,
            payable_date,
            round_date_start,
            round_date_end,
            item_id,
            department_sub_id,
            book_number,
            delivery_note_number,
            receive_amount,
            amount,
            bill_date,
            pay_date,
            payment_voucher,
            invoice_no,
            pay_amount,
            limit_day,
            comment,
            complete,
            complete_date,
            uuid,
            created_at,
            updated_at
        });

        eventLogger.info('postRestoreAccountPayable restore ap_code '+ ap_code +' to system');

        return res.status(200).json(ap_code);
    } catch (error) {
        eventLogger.error('postRestoreAccountPayable Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}





/**
  * @description -This method returns detail of AccountPayable all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountPayable all
  */
const getAccountPayableAll = async (req, res) => {
    try {
        let data = await AccountPayable.findAll();

        if (!data) {
            return errorResponse(res, 404, 'AccountPayable_04', 'AccountPayable does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountPayableAll Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}



/**
  * @description -This method returns detail of AccountPayable all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountPayable all
  */
 const getAccountPayableCondition = async (req, res) => {
    try {
        const { type, year } = req.params;

        let data = '';

        if (type == 0) {
            data = await AccountPayable.findAllConditionYearAll(year);
        } else {
            data = await AccountPayable.findAllConditionTypeYear(type, year);
        } 

        if (data == '') {
            return errorResponse(res, 404, 'AccountPayable_04', 'AccountPayable does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountPayableCondition Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error'+error);
    }
}



/**
  * @description -This method returns year AccountPayable all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - year all
  */
const getAccountPayableYear = async (req, res) => {
    try {
        let data = await AccountPayable.findYearAll();

        if (!data) {
            return errorResponse(res, 404, 'AccountPayable_04', 'AccountPayable does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountPayableYear Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc AccountPayable detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountPayable from the controller
  * @returns {object} - AccountPayable detail
  */
const getAccountPayable = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let ap_code = bytes.toString(CryptoJS.enc.Utf8);

        if (!ap_code) {
            return errorResponse(res, 400, 'AccountPayable_01', 'ap_code is required', 'ap_code');
        }

        let data = await AccountPayable.findOne(ap_code);

        if (data == '') {
            return errorResponse(res, 404, 'AccountPayable_04', 'AccountPayable does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountPayable Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a AccountPayable's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - AccountPayable
  */
const updateAccountPayable = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let ap_code = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            payable_date,
            round_date_start,
            round_date_end,
            item_id,
            department_sub_id,
            book_number,
            delivery_note_number,
            receive_amount,
            amount,
            bill_date,
            pay_date,
            payment_voucher,
            invoice_no,
            pay_amount,
            limit_day,
            comment,
            complete,
            uuid,
        } = req.body;  
  
        let existingAccountPayable =  await AccountPayable.countByCode(ap_code);

        if (existingAccountPayable['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountPayable_04', 'AccountPayable does not exist.'); 
        }  

        let complete_date = null;
        if (complete == 'Y') {
            complete_date = date.format(new Date(), "YYYY-MM-DD");
        }
        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
      
        let data = await AccountPayable.updateByCode(ap_code, {
            payable_date,
            round_date_start,
            round_date_end,
            item_id,
            department_sub_id,
            book_number,
            delivery_note_number,
            receive_amount,
            amount,
            bill_date,
            pay_date,
            payment_voucher,
            invoice_no,
            pay_amount,
            limit_day,
            comment,
            complete,
            complete_date,
            uuid,
            updated_at
        });

        eventLogger.info('updateAccountPayable update detail ap_code:'+ ap_code);
  
        return res.status(200).json(data); 
    } catch (error) {
        eventLogger.error('updateAccountPayable Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a AccountPayable's  complete
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - AccountPayable complete
  */
 const updateAccountPayableComplete = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let ap_code = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            complete,
        } = req.body;  
  
        let existingAccountPayable =  await AccountPayable.countByCode(ap_code);

        if (existingAccountPayable['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountPayable_04', 'AccountPayable does not exist.'); 
        }  

        let complete_date = null;
        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
        if (complete == 'Y') {
            complete_date = date.format(new Date(), "YYYY-MM-DD");
        }
      
        let data = await AccountPayable.updateByCode(ap_code, {
            complete,
            complete_date,
            updated_at
        });

        eventLogger.info('updateAccountPayableComplete update detail ap_code:'+ ap_code);
  
        return res.status(200).json(data); 
    } catch (error) {
        eventLogger.error('updateAccountPayableComplete Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes AccountPayable
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountPayable from the controller
  * @returns {array} - removes AccountPayable
  */
 const deleteAccountPayable = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let ap_code = bytes.toString(CryptoJS.enc.Utf8);

        let existingAccountPayable =  await AccountPayable.countByCode(ap_code);

        if (existingAccountPayable['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountPayable_01', 'No AccountPayable found', 'id'); 
        }  

        await AccountPayable.destroyByCode(ap_code);

        eventLogger.info('deleteAccountPayable delete ap_code:'+ ap_code)

        return res.status(200).json({"result":"success"});
    } catch (error) {
        eventLogger.error('deleteAccountPayable Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postAccountPayable,
    postRestoreAccountPayable,
    getAccountPayableAll,
    getAccountPayableCondition,
    getAccountPayableYear,
    getAccountPayable,
    updateAccountPayable,
    updateAccountPayableComplete,
    deleteAccountPayable
} 