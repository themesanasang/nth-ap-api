'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccountPayableHistory,
    getAccountPayableHistoryAll,
    getAccountPayableHistoryCondition,
    getAccountPayableHistoryYear,
    getAccountPayableHistory,
    deleteAccountPayableHistory
} from '../controllers/account_payable_history_controller';


router.route('/api/v1/account_payable_history')
  .get(verifyToken, getAccountPayableHistoryAll)
  .post(verifyToken, postAccountPayableHistory)

router.route('/api/v1/account_payable_history/year').get(verifyToken, getAccountPayableHistoryYear)
router.route('/api/v1/account_payable_history/all/:type/:year').get(verifyToken, getAccountPayableHistoryCondition)

router.route('/api/v1/account_payable_history/:id')
  .get(verifyToken, getAccountPayableHistory)
  .delete(verifyToken, deleteAccountPayableHistory)


module.exports = router;