'use strict'

import CryptoJS from 'crypto-js';
import date from 'date-and-time';
import { AccountPayableArrear } from '../models';
import helpers from '../helpers/util';


let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a AccountPayableArrear
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountPayableArrear code
  */
const postAccountPayableArrear = async (req, res) => {
    const { 
        account_payable_id,
        amount_arrear,
        uuid
    } = req.body;  
  
    try {
        let arrear_date = date.format(new Date(), "YYYY-MM-DD");
        let amount = amount_arrear
        let uuid_created = uuid;
        await AccountPayableArrear.create({
            account_payable_id,
            arrear_date,
            amount,
            uuid_created
        });

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of AccountPayableArrear all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountPayableArrear all
  */
const getAccountPayableArrearAll = async (req, res) => {
    try {
        let data = await AccountPayableArrear.findAll();

        if (!data) {
            return errorResponse(res, 404, 'AccountPayableArrear_04', 'AccountPayableArrear does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of AccountPayableArrear all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - AccountPayableArrear all
  */
 const getAccountPayableArrearAllByType = async (req, res) => {
    try {
        const { type } = req.params;

        let data = await AccountPayableArrear.findAllByType(type);

        if (!data) {
            return errorResponse(res, 404, 'AccountPayableArrear_04', 'AccountPayableArrear does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}



/**
  * @description -This method get doc AccountPayableArrear detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountPayableArrear from the controller
  * @returns {object} - AccountPayableArrear detail
  */
const getAccountPayableArrear = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let arrear_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!arrear_id) {
            return errorResponse(res, 400, 'AccountPayableArrear_01', 'id is required', 'id');
        }

        let data = await AccountPayableArrear.findOne(arrear_id);

        if (data == '') {
            return errorResponse(res, 404, 'AccountPayableArrear_04', 'AccountPayableArrear does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a AccountPayableArrear's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - AccountPayableArrear
  */
const updateAccountPayableArrear = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let arrear_id = bytes.toString(CryptoJS.enc.Utf8);

        let { 
            paid,
            paid_amount,
            uuid_complete
        } = req.body;  
  
        let existingAccountPayableArrear =  await AccountPayableArrear.countByID(arrear_id);

        if (existingAccountPayableArrear['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountPayableArrear_04', 'AccountPayableArrear does not exist.'); 
        }  

        let paid_date = date.format(new Date(), "YYYY-MM-DD");
      
        let data = await AccountPayableArrear.update(arrear_id, {
            paid,
            paid_amount,
            paid_date,
            uuid_complete
        });
  
        return res.status(200).json(data); 
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes AccountPayableArrear
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountPayableArrear from the controller
  * @returns {array} - removes AccountPayableArrear
  */
 const deleteAccountPayableArrear = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let arrear_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingAccountPayableArrear =  await AccountPayableArrear.countByID(arrear_id);

        if (existingAccountPayableArrear['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountPayableArrear_01', 'No AccountPayableArrear found', 'id'); 
        }  

        await AccountPayableArrear.destroy(arrear_id);

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}



/**
  * @description -This method removes AccountPayableArrear
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent AccountPayableArrear from the controller
  * @returns {array} - removes AccountPayableArrear
  */
 const deleteAccountPayableArrearByAP = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let ap_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingAccountPayableArrear =  await AccountPayableArrear.countByAPID(ap_id);

        if (existingAccountPayableArrear['numrow'] == 0) {
            return errorResponse(res, 404, 'AccountPayableArrear_01', 'No AccountPayableArrear found', 'id'); 
        }  

        await AccountPayableArrear.destroyByAP(ap_id);

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postAccountPayableArrear,
    getAccountPayableArrearAll,
    getAccountPayableArrearAllByType,
    getAccountPayableArrear,
    updateAccountPayableArrear,
    deleteAccountPayableArrear,
    deleteAccountPayableArrearByAP
} 