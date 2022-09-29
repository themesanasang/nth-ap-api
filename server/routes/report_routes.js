'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    getReportGF,
    getReportPayableType
} from '../controllers/report_controller';



router.route('/api/v1/report/report-gf').post(verifyToken, getReportGF)
router.route('/api/v1/report/report-payable-type').post(verifyToken, getReportPayableType)


module.exports = router;