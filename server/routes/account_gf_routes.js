'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccountGF,
    getAccountGFAll,
    getAccountGF,
    updateAccountGF,
    deleteAccountGF,
    getUseGF,
    getListNameGF
} from '../controllers/account_gf_controller';


router.route('/api/v1/account_gf')
  .get(verifyToken, getAccountGFAll)
  .post(verifyToken, postAccountGF)


router.route('/api/v1/account_gf/usegf').get(verifyToken, getUseGF)


router.route('/api/v1/account_gf/:id')
  .get(verifyToken, getAccountGF)
  .put(verifyToken, updateAccountGF)
  .delete(verifyToken, deleteAccountGF)


router.route('/api/v1/account_gf/listname/:id').get(verifyToken, getListNameGF)


module.exports = router;