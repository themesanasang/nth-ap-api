'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postEmpEmpReport,
    getEmpReportAll,
    getEmpReport,
    updateEmpReport,
    deleteEmpReport
} from '../controllers/emp_report_controller';

router.route('/api/v1/emp_report')
  .get(verifyToken, getEmpReportAll)
  .post(verifyToken, postEmpEmpReport)

router.route('/api/v1/emp_report/:id')
  .get(verifyToken, getEmpReport)
  .put(verifyToken, updateEmpReport)
  .delete(verifyToken, deleteEmpReport)

module.exports = router;