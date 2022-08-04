'use strict'

import CryptoJS from 'crypto-js';
import { General } from '../models';
import helpers from '../helpers/util';

let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a General
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - General code
  */
const postGeneral = async (req, res) => {
    const { 
       code,
       name,
       address,
       mobile,
       affiliation
    } = req.body;  
  
    try {   
        await General.create({
            code,
            name,
            address,
            mobile,
            affiliation
        });

        return res.status(200).json(code);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error ');
    }
}


/**
  * @description -This method returns detail of General
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - General all
  */
const getGeneral = async (req, res) => {
    try {
        let data = await General.find();

        if (!data) {
            return errorResponse(res, 404, 'General_04', 'General does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a General's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - General
  */
 const updateGeneral = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let g_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            code,
            name,
            address,
            mobile,
            affiliation
        } = req.body;  
  
        let existingGeneral =  await General.countByID(g_id);

        if (existingGeneral['numrow'] == 0) {
            return errorResponse(res, 404, 'General_04', 'General does not exist.'); 
        }     

        await General.update(g_id, {
            code,
            name,
            address,
            mobile,
            affiliation
        });
  
        return res.status(200).json(code); 
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postGeneral,
    getGeneral,
    updateGeneral
} 