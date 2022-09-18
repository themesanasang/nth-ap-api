'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccountPayableArrear,
    getCountAccountPayableArrear,
    getAccountPayableArrearAll,
    getAccountPayableArrearAllByType,
    getAccountPayableArrear,
    getAccountPayableArrearByCode,
    updateAccountPayableArrear,
    deleteAccountPayableArrear,
    deleteAccountPayableArrearByAP
} from '../controllers/account_payable_arrear_controller';


router.route('/api/v1/account_payable_arrear')
  .get(verifyToken, getAccountPayableArrearAll)
  .post(verifyToken, postAccountPayableArrear)


router.route('/api/v1/account_payable_arrear/:id')
  .get(verifyToken, getAccountPayableArrear)
  .put(verifyToken, updateAccountPayableArrear)
  .delete(verifyToken, deleteAccountPayableArrear)

router.route('/api/v1/account_payable_arrear/byap/:id').delete(verifyToken, deleteAccountPayableArrearByAP)
router.route('/api/v1/account_payable_arrear/bytype/:type').get(verifyToken, getAccountPayableArrearAllByType)
router.route('/api/v1/account_payable_arrear/bycode/:id').get(verifyToken, getAccountPayableArrearByCode)
router.route('/api/v1/account_payable_arrear/count/:id').get(verifyToken, getCountAccountPayableArrear)
  

module.exports = router;