'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccountPayableArrearHistory,
    getCountAccountPayableArrearHistory,
    getAccountPayableArrearHistory,
    deleteAccountPayableArrearHistory,
    deleteAccountPayableArrearByAPHistory
} from '../controllers/account_payable_arrear_history_controller';


router.route('/api/v1/account_payable_arrear_history').post(verifyToken, postAccountPayableArrearHistory)


router.route('/api/v1/account_payable_arrear_history/:id')
  .get(verifyToken, getAccountPayableArrearHistory)
  .delete(verifyToken, deleteAccountPayableArrearHistory)

router.route('/api/v1/account_payable_arrear_history/byap/:id').delete(verifyToken, deleteAccountPayableArrearByAPHistory)
router.route('/api/v1/account_payable_arrear_history/count/:id').get(verifyToken, getCountAccountPayableArrearHistory)
  

module.exports = router;