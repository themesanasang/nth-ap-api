'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postPayableType,
    getPayableTypeAll,
    getPayableType,
    updatePayableType,
    deletePayableType
} from '../controllers/payable_type_controller';


router.route('/api/v1/payable_type')
  .get(verifyToken, getPayableTypeAll)
  .post(verifyToken, postPayableType)

router.route('/api/v1/payable_type/:id')
  .get(verifyToken, getPayableType)
  .put(verifyToken, updatePayableType)
  .delete(verifyToken, deletePayableType)


module.exports = router;