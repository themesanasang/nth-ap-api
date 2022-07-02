'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postDepartmentSub,
    getDepartmentSubAll,
    getDepartmentSub,
    updateDepartmentSub,
    deleteDepartmentSub
} from '../controllers/department_sub_controller';


router.route('/api/v1/department_sub')
  .get(verifyToken, getDepartmentSubAll)
  .post(verifyToken, postDepartmentSub)

router.route('/api/v1/department_sub/:id')
  .get(verifyToken, getDepartmentSub)
  .put(verifyToken, updateDepartmentSub)
  .delete(verifyToken, deleteDepartmentSub)


module.exports = router;