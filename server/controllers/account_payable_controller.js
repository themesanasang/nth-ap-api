'use strict'

import CryptoJS from 'crypto-js';
import date from 'date-and-time';
import { AccountPayable } from '../models';
import helpers from '../helpers/util';


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
        delivery_note_number,
        amount,
        bill_date,
        pay_date,
        payment_voucher,
        invoice_no,
        pay_amount,
        limit_day,
        comment,
        uuid
    } = req.body;  
  
    try {
        let data_date = date.format(new Date(), "YYYY-MM-DD");
        let created_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");

        await AccountPayable.create({
            payable_date,
            data_date,
            round_date_start,
            round_date_end,
            item_id,
            department_sub_id,
            delivery_note_number,
            amount,
            bill_date,
            pay_date,
            payment_voucher,
            invoice_no,
            pay_amount,
            limit_day,
            comment,
            uuid,
            created_at,
            updated_at
        });

        return res.status(200).json({"result":"success"});
    } catch (error) {
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

        let data = await AccountPayable.findAllCondition(type, year);

        if (data == '') {
            return errorResponse(res, 404, 'AccountPayable_04', 'AccountPayable does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
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
        let AccountPayable_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!AccountPayable_id) {
            return errorResponse(res, 400, 'AccountPayable_01', 'id is required', 'id');
        }

        let data = await AccountPayable.findOne(AccountPayable_id);

        if (data == '') {
            return errorResponse(res, 404, 'AccountPayable_04', 'AccountPayable does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
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
        let AccountPayable_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            payable_date,
            round_date_start,
            round_date_end,
            item_id,
            department_sub_id,
            delivery_note_number,
            amount,
            bill_date,
            pay_date,
            payment_voucher,
            invoice_no,
            pay_amount,
            limit_day,
            comment,
            uuid,
        } = req.body;  
  
        let existingAccountPayable =  await AccountPayable.countByID(AccountPayable_id);

        if (existingAccountPayable['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountPayable_04', 'AccountPayable does not exist.'); 
        }  

        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
      
        let data = await AccountPayable.update(AccountPayable_id, {
            payable_date,
            round_date_start,
            round_date_end,
            item_id,
            department_sub_id,
            delivery_note_number,
            amount,
            bill_date,
            pay_date,
            payment_voucher,
            invoice_no,
            pay_amount,
            limit_day,
            comment,
            uuid,
            updated_at
        });
  
        return res.status(200).json(data); 
    } catch (error) {
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
        let AccountPayable_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingAccountPayable =  await AccountPayable.countByID(AccountPayable_id);

        if (existingAccountPayable['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountPayable_01', 'No AccountPayable found', 'id'); 
        }  

        await AccountPayable.destroy(AccountPayable_id);

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postAccountPayable,
    getAccountPayableAll,
    getAccountPayableCondition,
    getAccountPayableYear,
    getAccountPayable,
    updateAccountPayable,
    deleteAccountPayable
} 