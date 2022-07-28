'use strict'

import CryptoJS from 'crypto-js';
import { LiabilitiesType } from '../models';
import helpers from '../helpers/util';


let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a LiabilitiesType
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - LiabilitiesType code
  */
const postLiabilitiesType = async (req, res) => {
    const { 
        liabilities_type_name,
        status
    } = req.body;  
  
    try {
        let existingLiabilitiesTypeName = await LiabilitiesType.countByName(liabilities_type_name);

        if (existingLiabilitiesTypeName['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The LiabilitiesType Name already exists.', 'LiabilitiesType Name'); 
        } 

        await LiabilitiesType.create({
            liabilities_type_name,
            status
        });

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of LiabilitiesType all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - LiabilitiesType all
  */
const getLiabilitiesTypeAll = async (req, res) => {
    try {
        let data = await LiabilitiesType.findAll();

        if (!data) {
            return errorResponse(res, 404, 'LiabilitiesType_04', 'LiabilitiesType does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc LiabilitiesType detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent LiabilitiesType from the controller
  * @returns {object} - LiabilitiesType detail
  */
const getLiabilitiesType = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let liabilities_type_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!liabilities_type_id) {
            return errorResponse(res, 400, 'LiabilitiesType_01', 'id is required', 'id');
        }

        let data = await LiabilitiesType.findOne(liabilities_type_id);

        if (data == '') {
            return errorResponse(res, 404, 'LiabilitiesType_04', 'LiabilitiesType does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a LiabilitiesType's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - LiabilitiesType
  */
const updateLiabilitiesType = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let liabilities_type_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            liabilities_type_name,
            status
        } = req.body;  
  
        let existingLiabilitiesType =  await LiabilitiesType.countByID(liabilities_type_id);

        if (existingLiabilitiesType['numrow'] == 0) {
            return errorResponse(res, 404, 'LiabilitiesType_04', 'LiabilitiesType does not exist.'); 
        }  
      
        let data = await LiabilitiesType.update(liabilities_type_id, {
            liabilities_type_name,
            status
        });
  
        return res.status(200).json(data); 
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes LiabilitiesType
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent LiabilitiesType from the controller
  * @returns {array} - removes LiabilitiesType
  */
 const deleteLiabilitiesType = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let liabilities_type_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingLiabilitiesType =  await LiabilitiesType.countByID(liabilities_type_id);

        if (existingLiabilitiesType['numrow'] == 0) {
            return errorResponse(res, 404, 'LiabilitiesType_01', 'No LiabilitiesType found', 'id'); 
        }  

        let countWork = await LiabilitiesType.countWork(liabilities_type_id);

        if (countWork['numrow'] > 0) {
            let status = 'N';
            
            await LiabilitiesType.update(liabilities_type_id, {
                status
            });
        } else {
            await LiabilitiesType.destroy(liabilities_type_id);
        }

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postLiabilitiesType,
    getLiabilitiesTypeAll,
    getLiabilitiesType,
    updateLiabilitiesType,
    deleteLiabilitiesType
} 