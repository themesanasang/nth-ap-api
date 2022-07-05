'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postLiabilities,
    getLiabilitiesAll,
    getLiabilities,
    updateLiabilities,
    deleteLiabilities
} from '../controllers/liabilities_controller';


router.route('/api/v1/liabilities')
  .get(verifyToken, getLiabilitiesAll)
  .post(verifyToken, postLiabilities)

router.route('/api/v1/liabilities/:id')
  .get(verifyToken, getLiabilities)
  .put(verifyToken, updateLiabilities)
  .delete(verifyToken, deleteLiabilities)


module.exports = router;