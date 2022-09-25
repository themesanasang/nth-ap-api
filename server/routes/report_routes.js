'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    getReportGF
} from '../controllers/report_controller';




router.route('/api/v1/report/report-gf').post(verifyToken, getReportGF)
  


module.exports = router;