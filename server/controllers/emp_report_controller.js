'use strict'

import CryptoJS from 'crypto-js';
import { EmpReport } from '../models';
import helpers from '../helpers/util';
import { eventLogger } from '../helpers/logsApp';

let {
  errorResponse
} = helpers;



/**
  * @description -This method registers a EmpReport
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - id
  */
const postEmpEmpReport = async (req, res) => {
    const { 
        name,
        title1,
        title2,
        title3,
        status
    } = req.body;  
  
    try {
        let existing = await EmpReport.countByName(name);

        if (existing['numrow'] > 0) {
            return errorResponse(res, 409, 'EmpReport_04', 'The name already exists.', 'name'); 
        }  
       
        let data = await EmpReport.create({
            name,
            title1,
            title2,
            title3,
            status
        });

        eventLogger.info('postEmpEmpReport register '+ name +' to system');

        return res.status(200).json(data);
    } catch (error) {
      eventLogger.error('postEmpEmpReport Req Internal Server Error: ' + error);
      return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}



/**
  * @description -This method returns detail of EmpReport all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - EmpReport all
  */
const getEmpReportAll = async (req, res) => {
    try {
      let data = await EmpReport.findAll();

      if (!data) {
        return errorResponse(res, 404, 'EmpReport_04', 'EmpReport does not exist.');
      }

      return res.status(200).json(data);
    } catch (error) {
      eventLogger.error('getEmpReportAll Req Internal Server Error: ' + error);
      return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc EmpReport detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent EmpReport from the controller
  * @returns {object} - EmpReport detail
  */
const getEmpReport = async (req, res) => {
    try {
      const { id } = req.params;
  
      let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
      let idemp = bytes.toString(CryptoJS.enc.Utf8);
  
      if (!idemp) {
        return errorResponse(res, 400, 'EmpReport_01', 'id is required', 'id');
      }

      let data = await EmpReport.findOne(idemp);
  
      if (data == '') {
        return errorResponse(res, 404, 'EmpReport_04', 'EmpReport does not exist.');
      }
  
      return res.status(200).json(data);
    } catch (error) {
      eventLogger.error('getEmpReport Req Internal Server Error: ' + error);
      return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a EmpReport's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - EmpReport
  */
const updateEmpReport = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let idemp = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            name,
            title1,
            title2,
            title3,
            status
        } = req.body;  
  
        let existing =  await EmpReport.countByID(idemp);

        if (existing['numrow'] == 0) {
            return errorResponse(res, 404, 'EmpReport_04', 'EmpReport does not exist.'); 
        }  
      
        let data = await EmpReport.update(idemp, {
            name,
            title1,
            title2,
            title3,
            status
        });

        eventLogger.info('updateEmpReport update detail idemp:'+ idemp);
  
        return res.status(200).json(data); 
    } catch (error) {
      eventLogger.error('updateEmpReport Req Internal Server Error: ' + error);
      return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}



/**
  * @description -This method removes EmpReport
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent EmpReport from the controller
  * @returns {array} - removes EmpReport
  */
const deleteEmpReport = async (req, res) => {
    try {
      const { id } = req.params;
  
      let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
      let idemp = bytes.toString(CryptoJS.enc.Utf8);
      let existing =  await EmpReport.countByID(idemp);

      if (existing['numrow'] == 0) {
        return errorResponse(res, 404, 'EmpReport_01', 'No EmpReport found', 'id'); 
      }  

      await EmpReport.destroy(idemp);

      eventLogger.info('deleteEmpReport delete idemp:'+ idemp)
  
      return res.status(200).json({"result":"success"});
    } catch (error) {
      eventLogger.error('deleteEmpReport Req Internal Server Error: ' + error);
      return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postEmpEmpReport,
    getEmpReportAll,
    getEmpReport,
    updateEmpReport,
    deleteEmpReport
} 