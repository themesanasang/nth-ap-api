'use strict'

import CryptoJS from 'crypto-js';
import date from 'date-and-time';
import { AccountPayableHistory } from '../models';
import helpers from '../helpers/util';
import { eventLogger } from '../helpers/logsApp';

let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a AccountPayableHistory
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountPayableHistory code
  */
const postAccountPayableHistory = async (req, res) => {
    const { 
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
    } = req.body;  
  
    try {
        let history_date = date.format(new Date(), "YYYY-MM-DD");
        let history_time = date.format(new Date(), "HH:mm:ss");

        let existingAccountPayableHIstory =  await AccountPayableHistory.countByCode(ap_code);

        if (existingAccountPayableHIstory['numrow'] == 3) {
            let minID  = await AccountPayableHistory.findMinID(ap_code);
            await AccountPayableHistory.destroyByID(minID['account_payable_history_id']);
            await AccountPayableHistory.destroyArrearByID(minID['account_payable_history_id']);
        }  

        let data = await AccountPayableHistory.create({
            history_date,
            history_time,
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

        eventLogger.info('postAccountPayableHistory register ap_code '+ ap_code +' to system');

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('postAccountPayableHistory Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of AccountPayableHistory all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountPayableHistory all
  */
const getAccountPayableHistoryAll = async (req, res) => {
    try {
        let data = await AccountPayableHistory.findAll();

        if (!data) {
            return errorResponse(res, 404, 'AccountPayableHistory_04', 'AccountPayableHistory does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountPayableHistoryAll Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}



/**
  * @description -This method returns detail of AccountPayableHistory all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountPayableHistory all
  */
 const getAccountPayableHistoryCondition = async (req, res) => {
    try {
        const { type, year } = req.params;

        let data = '';

        if (type == 0) {
            data = await AccountPayableHistory.findAllConditionYearAll(year);
        } else {
            data = await AccountPayableHistory.findAllConditionTypeYear(type, year);
        } 

        if (data == '') {
            return errorResponse(res, 404, 'AccountPayableHistory_04', 'AccountPayableHistory does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountPayableHistoryCondition Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error'+error);
    }
}



/**
  * @description -This method returns year AccountPayableHistory all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - year all
  */
const getAccountPayableHistoryYear = async (req, res) => {
    try {
        let data = await AccountPayableHistory.findYearAll();

        if (!data) {
            return errorResponse(res, 404, 'AccountPayableHistory_04', 'AccountPayableHistory does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountPayableHistoryYear Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc AccountPayableHistory detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountPayableHistory from the controller
  * @returns {object} - AccountPayableHistory detail
  */
const getAccountPayableHistory = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let ap_code = bytes.toString(CryptoJS.enc.Utf8);

        if (!ap_code) {
            return errorResponse(res, 400, 'AccountPayableHistory_01', 'ap_code is required', 'ap_code');
        }

        let data = await AccountPayableHistory.findOne(ap_code);

        if (data == '') {
            return errorResponse(res, 404, 'AccountPayableHistory_04', 'AccountPayableHistory does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getAccountPayableHistory Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes AccountPayableHistory
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountPayableHistory from the controller
  * @returns {array} - removes AccountPayableHistory
  */
 const deleteAccountPayableHistory = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let h_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingAccountPayableHistory =  await AccountPayableHistory.countByID(h_id);

        if (existingAccountPayableHistory['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountPayableHistory_01', 'No AccountPayableHistory found', 'id'); 
        }  

        await AccountPayableHistory.destroyByID(h_id);

        eventLogger.info('deleteAccountPayableHistory delete id:'+ h_id)

        return res.status(200).json({"result":"success"});
    } catch (error) {
        eventLogger.error('deleteAccountPayableHistory Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postAccountPayableHistory,
    getAccountPayableHistoryAll,
    getAccountPayableHistoryCondition,
    getAccountPayableHistoryYear,
    getAccountPayableHistory,
    deleteAccountPayableHistory
} 