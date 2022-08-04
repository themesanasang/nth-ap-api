'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postGeneral,
    getGeneral,
    updateGeneral
} from '../controllers/general_controller';

router.route('/api/v1/general')
  .get(verifyToken, getGeneral)
  .post(verifyToken, postGeneral)

 router.route('/api/v1/general/:id').put(verifyToken, updateGeneral)

module.exports = router;