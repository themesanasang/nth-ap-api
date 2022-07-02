'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
  loginUser,
  postUser,
  getUserAll,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/user_controller';


router.route('/api/v1/login').post(loginUser)

router.route('/api/v1/user')
  .get(verifyToken, getUserAll)
  .post(postUser)

router.route('/api/v1/user/:id')
  .get(verifyToken, getUser)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser)


module.exports = router;