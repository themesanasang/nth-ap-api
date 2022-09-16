'use strict'

import CryptoJS from 'crypto-js';
import { DepartmentSub } from '../models';
import helpers from '../helpers/util';
import { eventLogger } from '../helpers/logsApp';

let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a DepartmentSub
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - DepartmentSub code
  */
const postDepartmentSub = async (req, res) => {
    const { 
        department_id,
        department_sub_code,
        department_sub_name,
        status
    } = req.body;  
  
    try {
        let existingDepartmentSubCode = await DepartmentSub.countByCode(department_sub_code);

        if (existingDepartmentSubCode['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The DepartmentSub Code already exists.', 'DepartmentSub Code'); 
        }  

        let existingDepartmentSubName = await DepartmentSub.countByName(department_sub_name);

        if (existingDepartmentSubName['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The DepartmentSub Name already exists.', 'DepartmentSub Name'); 
        } 

        await DepartmentSub.create({
            department_id,
            department_sub_code,
            department_sub_name,
            status
        });

        eventLogger.info('postDepartmentSub register '+ department_sub_name +' to system');

        return res.status(200).json(department_sub_code);
    } catch (error) {
        eventLogger.error('postDepartmentSub Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of DepartmentSub all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - DepartmentSub all
  */
const getDepartmentSubAll = async (req, res) => {
    try {
        let data = await DepartmentSub.findAll();

        if (!data) {
            return errorResponse(res, 404, 'DepartmentSub_04', 'DepartmentSub does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getDepartmentSubAll Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error'+error);
    }
}


/**
  * @description -This method get doc DepartmentSub detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent DepartmentSub from the controller
  * @returns {object} - DepartmentSub detail
  */
const getDepartmentSub = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let department_sub_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!department_sub_id) {
            return errorResponse(res, 400, 'DepartmentSub_01', 'id is required', 'id');
        }

        let data = await DepartmentSub.findOne(department_sub_id);

        if (data == '') {
            return errorResponse(res, 404, 'DepartmentSub_04', 'DepartmentSub does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getDepartmentSub Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a DepartmentSub's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - DepartmentSub
  */
const updateDepartmentSub = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let department_sub_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            department_id,
            department_sub_code,
            department_sub_name,
            status
        } = req.body;  
  
        let existingDepartmentSub =  await DepartmentSub.countByID(department_sub_id);

        if (existingDepartmentSub['numrow'] == 0) {
            return errorResponse(res, 404, 'DepartmentSub_04', 'DepartmentSub does not exist.'); 
        }  
      
        let data = await DepartmentSub.update(department_sub_id, {
            department_id,
            department_sub_code,
            department_sub_name,
            status
        });

        eventLogger.info('updateDepartmentSub update detail department_sub_id:'+ department_sub_id);
  
        return res.status(200).json(data); 
    } catch (error) {
        eventLogger.error('updateDepartmentSub Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes DepartmentSub
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent DepartmentSub from the controller
  * @returns {array} - removes DepartmentSub
  */
 const deleteDepartmentSub = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let department_sub_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingDepartmentSub =  await DepartmentSub.countByID(department_sub_id);

        if (existingDepartmentSub['numrow'] == 0) {
            return errorResponse(res, 404, 'DepartmentSub_01', 'No DepartmentSub found', 'id'); 
        }  

        let countWork = await DepartmentSub.countWork(department_sub_id);

        if (countWork['numrow'] > 0) {
            let status = 'N';
            
            await DepartmentSub.update(department_sub_id, {
                status
            });
        } else {
            await DepartmentSub.destroy(department_sub_id);
        }

        eventLogger.info('deleteDepartmentSub delete department_sub_id:'+ department_sub_id)

        return res.status(200).json({"result":"success"});
    } catch (error) {
        eventLogger.error('deleteDepartmentSub Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postDepartmentSub,
    getDepartmentSubAll,
    getDepartmentSub,
    updateDepartmentSub,
    deleteDepartmentSub
} 