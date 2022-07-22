'use strict'

import CryptoJS from 'crypto-js';
import date from 'date-and-time';
import { Payable } from '../models';
import helpers from '../helpers/util';


let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a Payable
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - Payable code
  */
const postPayable = async (req, res) => {
    const { 
        name,
        mobile,
        address,
        status
    } = req.body;  
  
    try {
        let existingPayableName = await Payable.countByName(name);

        if (existingPayableName['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The Payable Name already exists.', 'Payable Name'); 
        } 

        let created_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");

        await Payable.create({
            name,
            mobile,
            address,
            status,
            created_at,
            updated_at
        });

        return res.status(200).json(name);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of Payable all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - Payable all
  */
const getPayableAll = async (req, res) => {
    try {
        let data = await Payable.findAll();

        if (!data) {
            return errorResponse(res, 404, 'Payable_04', 'Payable does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc Payable detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent Payable from the controller
  * @returns {object} - Payable detail
  */
const getPayable = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let payable_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!payable_id) {
            return errorResponse(res, 400, 'Payable_01', 'id is required', 'id');
        }

        let data = await Payable.findOne(payable_id);

        if (data == '') {
            return errorResponse(res, 404, 'Payable_04', 'Payable does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a Payable's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - Payable
  */
const updatePayable = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let payable_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            name,
            mobile,
            address,
            status,
        } = req.body;  
  
        let existingPayable =  await Payable.countByID(payable_id);

        if (existingPayable['numrow'] == 0) {
            return errorResponse(res, 404, 'Payable_04', 'Payable does not exist.'); 
        }  

        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
      
        let data = await Payable.update(payable_id, {
            name,
            mobile,
            address,
            status,
            updated_at
        });
  
        return res.status(200).json(data); 
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes Payable
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent Payable from the controller
  * @returns {array} - removes Payable
  */
 const deletePayable = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let payable_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingPayable =  await Payable.countByID(payable_id);

        if (existingPayable['numrow'] == 0) {
            return errorResponse(res, 404, 'Payable_01', 'No Payable found', 'id'); 
        }  

        let countWork = await Payable.countWork(payable_id);

        if (countWork['numrow'] > 0) {
            let status = 'N';
            let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss"); 
            
            await Payable.update(payable_id, {
                status, 
                updated_at
            });
        } else {
            await Payable.destroy(payable_id);
        }

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postPayable,
    getPayableAll,
    getPayable,
    updatePayable,
    deletePayable
} 