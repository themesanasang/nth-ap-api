'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccountPayableArrear,
    getAccountPayableArrearAll,
    getAccountPayableArrear,
    updateAccountPayableArrear,
    deleteAccountPayableArrear
} from '../controllers/account_payable_arrear_controller';


router.route('/api/v1/account_payable_arrear')
  .get(verifyToken, getAccountPayableArrearAll)
  .post(verifyToken, postAccountPayableArrear)


router.route('/api/v1/account_payable_arrear/:id')
  .get(verifyToken, getAccountPayableArrear)
  .put(verifyToken, updateAccountPayableArrear)
  .delete(verifyToken, deleteAccountPayableArrear)

  

module.exports = router;