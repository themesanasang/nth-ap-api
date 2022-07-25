'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccountGF,
    getAccountGFAll,
    getAccountGF,
    updateAccountGF,
    deleteAccountGF
} from '../controllers/account_gf_controller';


router.route('/api/v1/account_gf')
  .get(verifyToken, getAccountGFAll)
  .post(verifyToken, postAccountGF)

router.route('/api/v1/account_gf/:id')
  .get(verifyToken, getAccountGF)
  .put(verifyToken, updateAccountGF)
  .delete(verifyToken, deleteAccountGF)


module.exports = router;