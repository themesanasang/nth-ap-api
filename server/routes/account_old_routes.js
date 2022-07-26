'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccountOld,
    getAccountOldAll,
    getAccountOldOne,
    updateAccountOld,
    deleteAccountOld
} from '../controllers/account_old_controller';


router.route('/api/v1/account_old')
  .get(verifyToken, getAccountOldAll)
  .post(verifyToken, postAccountOld)

router.route('/api/v1/account_old/:id')
  .get(verifyToken, getAccountOldOne)
  .put(verifyToken, updateAccountOld)
  .delete(verifyToken, deleteAccountOld)


module.exports = router;