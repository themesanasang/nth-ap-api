'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postLiabilitiesType,
    getLiabilitiesTypeAll,
    getLiabilitiesType,
    updateLiabilitiesType,
    deleteLiabilitiesType
} from '../controllers/liabilities_type_controller';


router.route('/api/v1/liabilities_type')
  .get(verifyToken, getLiabilitiesTypeAll)
  .post(verifyToken, postLiabilitiesType)

router.route('/api/v1/liabilities_type/:id')
  .get(verifyToken, getLiabilitiesType)
  .put(verifyToken, updateLiabilitiesType)
  .delete(verifyToken, deleteLiabilitiesType)


module.exports = router;