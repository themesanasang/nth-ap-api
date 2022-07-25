'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postAccountMain,
    getAccountMainAll,
    getAccountMain,
    updateAccountMain,
    deleteAccountMain
} from '../controllers/account_main_controller';


router.route('/api/v1/account_main')
  .get(verifyToken, getAccountMainAll)
  .post(verifyToken, postAccountMain)

router.route('/api/v1/account_main/:id')
  .get(verifyToken, getAccountMain)
  .put(verifyToken, updateAccountMain)
  .delete(verifyToken, deleteAccountMain)


module.exports = router;