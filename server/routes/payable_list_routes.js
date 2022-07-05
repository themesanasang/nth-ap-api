'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postPayableList,
    getPayableListAll,
    getPayableList,
    updatePayableList,
    deletePayableList
} from '../controllers/payable_list_controller';


router.route('/api/v1/payable_list')
  .get(verifyToken, getPayableListAll)
  .post(verifyToken, postPayableList)

router.route('/api/v1/payable_list/:id')
  .get(verifyToken, getPayableList)
  .put(verifyToken, updatePayableList)
  .delete(verifyToken, deletePayableList)


module.exports = router;