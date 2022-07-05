'use strict'

import express from 'express';
let router = express.Router();
import verifyToken from '../middleware/verify_token';
import {
    postItem,
    getItemAll,
    getItem,
    updateItem,
    deleteItem
} from '../controllers/item_controller';


router.route('/api/v1/item')
  .get(verifyToken, getItemAll)
  .post(verifyToken, postItem)

router.route('/api/v1/item/:id')
  .get(verifyToken, getItem)
  .put(verifyToken, updateItem)
  .delete(verifyToken, deleteItem)


module.exports = router;