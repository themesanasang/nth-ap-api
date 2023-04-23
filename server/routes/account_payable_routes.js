'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccountPayable,
    postRestoreAccountPayable,
    getAccountPayableAll,
    getAccountPayableCondition,
    getAccountPayableYear,
    getAccountPayable,
    updateAccountPayable,
    updateAccountPayablePay,
    updateAccountPayableComplete,
    deleteAccountPayable,
    getRemainByItem
} from '../controllers/account_payable_controller';


router.route('/api/v1/account_payable')
  .get(verifyToken, getAccountPayableAll)
  .post(verifyToken, postAccountPayable)

router.route('/api/v1/account_payable/restore').post(verifyToken, postRestoreAccountPayable)

router.route('/api/v1/account_payable/year').get(verifyToken, getAccountPayableYear)
router.route('/api/v1/account_payable/all/:type/:year').get(verifyToken, getAccountPayableCondition)

router.route('/api/v1/account_payable/:id')
  .get(verifyToken, getAccountPayable)
  .put(verifyToken, updateAccountPayable)
  .delete(verifyToken, deleteAccountPayable)

router.route('/api/v1/account_payable/pay/:id').put(verifyToken, updateAccountPayablePay)
router.route('/api/v1/account_payable/complete/:id').put(verifyToken, updateAccountPayableComplete)
router.route('/api/v1/account_payable/remain/item/:id').get(verifyToken, getRemainByItem)

module.exports = router;