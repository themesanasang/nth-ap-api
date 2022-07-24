'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
  loginUser,
  loginSocial,
  postUser,
  postUserAllData,
  postUserSocial,
  getUserAll,
  getUser,
  updateUser,
  updateUser2,
  deleteUser
} from '../controllers/user_controller';

router.route('/api/v1/login').post(loginUser)
router.route('/api/v1/login/social').post(loginSocial)

router.route('/api/v1/user')
  .get(verifyToken, getUserAll)
  .post(postUser)

router.route('/api/v1/setting/user').post(postUserAllData)

router.route('/api/v1/user/social').post(postUserSocial)

router.route('/api/v1/user/:id')
  .get(verifyToken, getUser)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser)

router.route('/api/v1/setting/user/:id').put(verifyToken, updateUser2)


module.exports = router;