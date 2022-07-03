'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccountOld,
    getAccountOldAll,
    updateAccountOld,
    deleteAccountOld
} from '../controllers/account_old_controller';


router.route('/api/v1/account_old').post(verifyToken, postAccountOld)

router.route('/api/v1/account_old/:id')
  .get(verifyToken, getAccountOldAll)
  .put(verifyToken, updateAccountOld)
  .delete(verifyToken, deleteAccountOld)


module.exports = router;