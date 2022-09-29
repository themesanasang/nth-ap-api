'use strict'

import { Report } from '../models';
import helpers from '../helpers/util';
import { eventLogger } from '../helpers/logsApp';

let {
    errorResponse
} = helpers;




/**
  * @description -This method get doc ReportGF detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent ReportGF from the controller
  * @returns {object} - ReportGF detail
  */
const getReportGF = async (req, res) => {
    try {
        const { 
            gf,
            dateStart,
            dateEnd
        } = req.body;  

        if (!gf) {
            return errorResponse(res, 400, 'ReportGF_01', 'gf is required', 'gf');
        }

        let data = await Report.reportGF(gf, dateStart, dateEnd);

        if (data == '') {
            return errorResponse(res, 404, 'ReportGF_04', 'ReportGF does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getReportGF Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}




/**
  * @description -This method get doc ReportPayableType detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent ReportPayableType from the controller
  * @returns {object} - ReportPayableType detail
  */
 const getReportPayableType = async (req, res) => {
    try {
        const { 
            type,
            dateStart,
            dateEnd
        } = req.body;  

        if (!type) {
            return errorResponse(res, 400, 'ReportPayableType_01', 'gf is required', 'gf');
        }

        let data = await Report.reportPayableType(type, dateStart, dateEnd);

        if (data == '') {
            return errorResponse(res, 404, 'ReportPayableType_04', 'ReportPayableType does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getReportPayableType Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}




module.exports = {
    getReportGF,
    getReportPayableType
} 