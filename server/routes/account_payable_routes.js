'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccountPayable,
    getAccountPayableAll,
    getAccountPayableCondition,
    getAccountPayableYear,
    getAccountPayable,
    updateAccountPayable,
    deleteAccountPayable
} from '../controllers/account_payable_controller';


router.route('/api/v1/account_payable')
  .get(verifyToken, getAccountPayableAll)
  .post(verifyToken, postAccountPayable)

router.route('/api/v1/account_payable/year').get(verifyToken, getAccountPayableYear)
router.route('/api/v1/account_payable/all/:type/:year').get(verifyToken, getAccountPayableCondition)

router.route('/api/v1/account_payable/:id')
  .get(verifyToken, getAccountPayable)
  .put(verifyToken, updateAccountPayable)
  .delete(verifyToken, deleteAccountPayable)

  

module.exports = router;