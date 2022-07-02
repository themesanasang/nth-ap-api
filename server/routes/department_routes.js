'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postDepartment,
    getDepartmentAll,
    getDepartment,
    updateDepartment,
    deleteDepartment
} from '../controllers/department_controller';


router.route('/api/v1/department')
  .get(verifyToken, getDepartmentAll)
  .post(verifyToken, postDepartment)

router.route('/api/v1/department/:id')
  .get(verifyToken, getDepartment)
  .put(verifyToken, updateDepartment)
  .delete(verifyToken, deleteDepartment)


module.exports = router;