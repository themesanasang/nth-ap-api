'use strict'

import CryptoJS from 'crypto-js';
import { PayableType } from '../models';
import helpers from '../helpers/util';


let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a PayableType
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - PayableType code
  */
const postPayableType = async (req, res) => {
    const { 
        account_id,
        payable_type_name,
        status
    } = req.body;  
  
    try {
        let existingPayableTypeName = await PayableType.countByName(account_id, payable_type_name);

        if (existingPayableTypeName['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The PayableType Name already exists.', 'PayableType Name'); 
        } 

        await PayableType.create({
            account_id,
            payable_type_name,
            status
        });

        return res.status(200).json(payable_type_name);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of PayableType all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - PayableType all
  */
const getPayableTypeAll = async (req, res) => {
    try {
        let data = await PayableType.findAll();

        if (!data) {
            return errorResponse(res, 404, 'PayableType_04', 'PayableType does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc PayableType detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent PayableType from the controller
  * @returns {object} - PayableType detail
  */
const getPayableType = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.SECRET_KEY);
        let payable_type_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!payable_type_id) {
            return errorResponse(res, 400, 'PayableType_01', 'id is required', 'id');
        }

        let data = await PayableType.findOne(payable_type_id);

        if (data == '') {
            return errorResponse(res, 404, 'PayableType_04', 'PayableType does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a PayableType's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - PayableType
  */
const updatePayableType = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.SECRET_KEY);
        let payable_type_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            account_id,
            payable_type_name,
            status
        } = req.body;  
  
        let existingPayableType =  await PayableType.countByID(payable_type_id);

        if (existingPayableType['numrow'] == 0) {
            return errorResponse(res, 404, 'PayableType_04', 'PayableType does not exist.'); 
        }  
      
        let data = await PayableType.update(payable_type_id, {
            account_id,
            payable_type_name,
            status
        });
  
        return res.status(200).json(data); 
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes PayableType
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent PayableType from the controller
  * @returns {array} - removes PayableType
  */
 const deletePayableType = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.SECRET_KEY);
        let payable_type_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingPayableType =  await PayableType.countByID(payable_type_id);

        if (existingPayableType['numrow'] == 0) {
            return errorResponse(res, 404, 'PayableType_01', 'No PayableType found', 'id'); 
        }  

        let countWork = await PayableType.countWork(payable_type_id);

        if (countWork['numrow'] > 0) {
            let status = 'N';
            
            await PayableType.update(payable_type_id, {
                status
            });
        } else {
            await PayableType.destroy(payable_type_id);
        }

        return res.status(204).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postPayableType,
    getPayableTypeAll,
    getPayableType,
    updatePayableType,
    deletePayableType
} 