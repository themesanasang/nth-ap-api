'use strict'

import CryptoJS from 'crypto-js';
import date from 'date-and-time';
import { Item } from '../models';
import helpers from '../helpers/util';
import { eventLogger } from '../helpers/logsApp';

let {
    errorResponse
} = helpers;


/**
  * @description -This method registers a Item
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - Item code
  */
const postItem = async (req, res) => {
    const { 
        payable_list_id,
        liabilities_id,
        item_name,
        status
    } = req.body;  
  
    try {
        let existingItemName = await Item.countByName(payable_list_id, liabilities_id, item_name);

        if (existingItemName['numrow'] > 0) {
            return errorResponse(res, 409, 'USR_04', 'The Item Name already exists.', 'Item Name'); 
        } 

        let created_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");

        await Item.create({
            payable_list_id,
            liabilities_id,
            item_name,
            status,
            created_at,
            updated_at
        });

        eventLogger.info('postItem register '+ item_name +' to system');

        return res.status(200).json({"result":"success"});
    } catch (error) {
        eventLogger.error('postItem Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method returns detail of Item all
  * @param {object} req - The request payload
  * @param {object} res - The response payload sent back from the method
  * @returns {object} - Item all
  */
const getItemAll = async (req, res) => {
    try {
        let data = await Item.findAll();

        if (!data) {
            return errorResponse(res, 404, 'Item_04', 'Item does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getItemAll Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method get doc Item detail
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent Item from the controller
  * @returns {object} - Item detail
  */
const getItem = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let item_id = bytes.toString(CryptoJS.enc.Utf8);

        if (!item_id) {
            return errorResponse(res, 400, 'Item_01', 'id is required', 'id');
        }

        let data = await Item.findOne(item_id);

        if (data == '') {
            return errorResponse(res, 404, 'Item_04', 'Item does not exist.');
        }

        return res.status(200).json(data);
    } catch (error) {
        eventLogger.error('getItem Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method updates a Item's personal details
  * @param {object} req - The request payload
  * @param {object} res - The response payload
  * @returns {object} - Item
  */
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
  
        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let item_id = bytes.toString(CryptoJS.enc.Utf8);
  
        let { 
            payable_list_id,
            liabilities_id,
            item_name,
            status,
        } = req.body;  
  
        let existingItem =  await Item.countByID(item_id);

        if (existingItem['numrow'] == 0) {
            return errorResponse(res, 404, 'Item_04', 'Item does not exist.'); 
        }  

        let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
      
        let data = await Item.update(item_id, {
            payable_list_id,
            liabilities_id,
            item_name,
            status,
            updated_at
        });

        eventLogger.info('updateItem update detail item_id:'+ item_id);
  
        return res.status(200).json(data); 
    } catch (error) {
        eventLogger.error('updateItem Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


/**
  * @description -This method removes Item
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent Item from the controller
  * @returns {array} - removes Item
  */
 const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        let bytes = CryptoJS.AES.decrypt(id, process.env.secretKey);
        let item_id = bytes.toString(CryptoJS.enc.Utf8);

        let existingItem =  await Item.countByID(item_id);

        if (existingItem['numrow'] == 0) {
            return errorResponse(res, 404, 'Item_01', 'No Item found', 'id'); 
        }  

        let countWork = await Item.countWork(item_id);

        if (countWork['numrow'] > 0) {
            let status = 'N';
            let updated_at = date.format(new Date(), "YYYY-MM-DD HH:mm:ss"); 
            
            await Item.update(item_id, {
                status, 
                updated_at
            });
        } else {
            await Item.destroy(item_id);
        }

        eventLogger.info('deleteItem delete item_id:'+ item_id)

        return res.status(200).json({"result":"success"});
    } catch (error) {
        eventLogger.error('deleteItem Req Internal Server Error: ' + error);
        return errorResponse(res, 500, 'Error', 'Internal Server Error');
    }
}


module.exports = {
    postItem,
    getItemAll,
    getItem,
    updateItem,
    deleteItem
} 