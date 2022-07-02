'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccount,
    getAccountAll,
    getAccount,
    updateAccount,
    deleteAccount
} from '../controllers/account_controller';


router.route('/api/v1/account')
  .get(verifyToken, getAccountAll)
  .post(verifyToken, postAccount)

router.route('/api/v1/account/:id')
  .get(verifyToken, getAccount)
  .put(verifyToken, updateAccount)
  .delete(verifyToken, deleteAccount)


module.exports = router;