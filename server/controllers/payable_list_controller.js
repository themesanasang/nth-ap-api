'use strict'

import CryptoJS from 'crypto-js';
import { PayableList } from '../models';
import helpers from '../helpers/util';


let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a PayableList
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - PayableList code
  */
const postPayableList = async (req, res) => {
    const { 
        payable_id,
        payable_type_id,
        status
    } = req.body;  
  
    try {
        let existingPayableLis = await PayableList.countByAll(payable_id, payable_type_id);

        if (existingPayableLis['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The PayableList already exists.', 'PayableList'); 
        } 

        await PayableList.create({
            payable_id,
            payable_type_id,
            status
        });

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of PayableList all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - PayableList all
  */
const getPayableListAll = async (req, res) => {
    try {
        let data = await PayableList.findAll();

        if (!data) {
            return errorResponse(res, 404, 'PayableList_04', 'PayableList does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc PayableList detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent PayableList from the controller
  * @returns {object} - PayableList detail
  */
const getPayableList = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let payable_list_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!payable_list_id) {
            return errorResponse(res, 400, 'PayableList_01', 'id is required', 'id');
        }

        let data = await PayableList.findOne(payable_list_id);

        if (data == '') {
            return errorResponse(res, 404, 'PayableList_04', 'PayableList does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a PayableList's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - PayableList
  */
const updatePayableList = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let payable_list_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            payable_id,
            payable_type_id,
            status
        } = req.body;  
  
        let existingPayableList =  await PayableList.countByID(payable_list_id);

        if (existingPayableList['numrow'] == 0) {
            return errorResponse(res, 404, 'PayableList_04', 'PayableList does not exist.'); 
        }  
      
        let data = await PayableList.update(payable_list_id, {
            payable_id,
            payable_type_id,
            status
        });
  
        return res.status(200).json(data); 
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes PayableList
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent PayableList from the controller
  * @returns {array} - removes PayableList
  */
 const deletePayableList = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let payable_list_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingPayableList =  await PayableList.countByID(payable_list_id);

        if (existingPayableList['numrow'] == 0) {
            return errorResponse(res, 404, 'PayableList_01', 'No PayableList found', 'id'); 
        }  

        let countWork = await PayableList.countWork(payable_list_id);

        if (countWork['numrow'] > 0) {
            let status = 'N';
            
            await PayableList.update(payable_list_id, {
                status
            });
        } else {
            await PayableList.destroy(payable_list_id);
        }

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postPayableList,
    getPayableListAll,
    getPayableList,
    updatePayableList,
    deletePayableList
} 