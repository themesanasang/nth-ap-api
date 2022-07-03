'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postPayable,
    getPayableAll,
    getPayable,
    updatePayable,
    deletePayable
} from '../controllers/payable_controller';


router.route('/api/v1/payable')
  .get(verifyToken, getPayableAll)
  .post(verifyToken, postPayable)

router.route('/api/v1/payable/:id')
  .get(verifyToken, getPayable)
  .put(verifyToken, updatePayable)
  .delete(verifyToken, deletePayable)


module.exports = router;