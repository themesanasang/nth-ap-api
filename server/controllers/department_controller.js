'use strict'

import CryptoJS from 'crypto-js';
import { Department } from '../models';
import helpers from '../helpers/util';


let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a Department
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - departmen code
  */
const postDepartment = async (req, res) => {
    const { 
        department_code,
        department_name,
        status
    } = req.body;  
  
    try {
        let existingDepartmentCode = await Department.countByCode(department_code);

        if (existingDepartmentCode['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The Department Code already exists.', 'Department Code'); 
        }  

        let existingDepartmentName = await Department.countByName(department_name);

        if (existingDepartmentName['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The Department Name already exists.', 'Department Name'); 
        } 

        await Department.create({
            department_code,
            department_name,
            status
        });

        return res.status(200).json(department_code);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of Department all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - Department all
  */
const getDepartmentAll = async (req, res) => {
    try {
        let data = await Department.findAll();

        if (!data) {
            return errorResponse(res, 404, 'Department_04', 'Department does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc Department detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent Department from the controller
  * @returns {object} - Department detail
  */
const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let department_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!department_id) {
            return errorResponse(res, 400, 'department_01', 'id is required', 'id');
        }

        let data = await Department.findOne(department_id);

        if (data == '') {
            return errorResponse(res, 404, 'department_04', 'department does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a Department's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - Department
  */
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let department_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            department_code,
            department_name,
            status
        } = req.body;  
  
        let existingDepartment =  await Department.countByID(department_id);

        if (existingDepartment['numrow'] == 0) {
            return errorResponse(res, 404, 'Department_04', 'Department does not exist.'); 
        }  
      
        let data = await Department.update(department_id, {
            department_code,
            department_name,
            status
        });
  
        return res.status(200).json(data); 
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes Department
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent Department from the controller
  * @returns {array} - removes Department
  */
 const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let department_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingDepartment =  await Department.countByID(department_id);

        if (existingDepartment['numrow'] == 0) {
            return errorResponse(res, 404, 'Department_01', 'No Department found', 'id'); 
        }  

        let countWork = await Department.countWork(department_id);

        if (countWork['numrow'] > 0) {
            let status = 'N';
            
            await Department.update(department_id, {
                status
            });
        } else {
            await Department.destroy(department_id);
        }

        return res.status(200).json({"result":"success"});
    } catch (error) {
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postDepartment,
    getDepartmentAll,
    getDepartment,
    updateDepartment,
    deleteDepartment
} 