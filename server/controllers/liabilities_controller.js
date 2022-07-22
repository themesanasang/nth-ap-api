'use strict'

import CryptoJS from 'crypto-js';
import { Liabilities } from '../models';
import helpers from '../helpers/util';


let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a Liabilities
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - Liabilities code
  */
const postLiabilities = async (req, res) => {
    const { 
        liabilities_type_id,
        liabilities_name,
        status
    } = req.body;  
  
    try {
        let existingLiabilitiesName = await Liabilities.countByName(liabilities_type_id, liabilities_name);

        if (existingLiabilitiesName['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The Liabilities Name already exists.', 'Liabilities Name'); 
        } 

        await Liabilities.create({
            liabilities_type_id,
            liabilities_name,
            status
        });

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of Liabilities all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - Liabilities all
  */
const getLiabilitiesAll = async (req, res) => {
    try {
        let data = await Liabilities.findAll();

        if (!data) {
            return errorResponse(res, 404, 'Liabilities_04', 'Liabilities does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc Liabilities detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent Liabilities from the controller
  * @returns {object} - Liabilities detail
  */
const getLiabilities = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let liabilities_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!liabilities_id) {
            return errorResponse(res, 400, 'Liabilities_01', 'id is required', 'id');
        }

        let data = await Liabilities.findOne(liabilities_id);

        if (data == '') {
            return errorResponse(res, 404, 'Liabilities_04', 'Liabilities does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a Liabilities's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - Liabilities
  */
const updateLiabilities = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let liabilities_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            liabilities_type_id,
            liabilities_name,
            status
        } = req.body;  
  
        let existingLiabilities =  await Liabilities.countByID(liabilities_id);

        if (existingLiabilities['numrow'] == 0) {
            return errorResponse(res, 404, 'Liabilities_04', 'Liabilities does not exist.'); 
        }  
      
        let data = await Liabilities.update(liabilities_id, {
            liabilities_type_id,
            liabilities_name,
            status
        });
  
        return res.status(200).json(data); 
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes Liabilities
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent Liabilities from the controller
  * @returns {array} - removes Liabilities
  */
 const deleteLiabilities = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let liabilities_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingLiabilities =  await Liabilities.countByID(liabilities_id);

        if (existingLiabilities['numrow'] == 0) {
            return errorResponse(res, 404, 'Liabilities_01', 'No Liabilities found', 'id'); 
        }  

        let countWork = await Liabilities.countWork(liabilities_id);

        if (countWork['numrow'] > 0) {
            let status = 'N';
            
            await Liabilities.update(liabilities_id, {
                status
            });
        } else {
            await Liabilities.destroy(liabilities_id);
        }

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postLiabilities,
    getLiabilitiesAll,
    getLiabilities,
    updateLiabilities,
    deleteLiabilities
} 