'use strict'

const name = 'Item'
const tableName = 'ap_item'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (item_id) => knex.count('item_id AS numrow')
    .from(tableName)
    .whereRaw('item_id = ?', [item_id])
    .first()
    .timeout(timeout)

    const countByName = (payable_list_id, liabilities_id, item_name) => knex.count('item_id AS numrow')
    .from(tableName)
    .whereRaw('payable_list_id = ?', [payable_list_id])
    .whereRaw('liabilities_id = ?', [liabilities_id])
    .whereRaw('item_name = ?', [item_name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select(
        'item_id', 'ap_item.payable_list_id', 'ap_item.liabilities_id', 'ap_item.item_name', 'ap_item.status'
        , 'ap_liabilities.liabilities_name', 'ap_payable.name'
        , knex.raw('(SELECT name FROM ap_payable WHERE ap_payable.payable_id=ap_payable_list.payable_id) AS ap_payable_name')
        , knex.raw('(SELECT payable_type_name FROM ap_payable_type WHERE ap_payable_type.payable_type_id=ap_payable_list.payable_type_id) AS payable_type_name')
        , knex.raw('CONCAT(DATE_FORMAT(ap_item.created_at, "%d-%m-"),DATE_FORMAT(ap_item.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_item.updated_at, "%d-%m-"),DATE_FORMAT(ap_item.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_liabilities', 'ap_liabilities.liabilities_id', '=', 'ap_item.liabilities_id')
    .leftJoin('ap_payable_list', 'ap_payable_list.payable_list_id', '=', 'ap_item.payable_list_id')
    .leftJoin('ap_payable', 'ap_payable.payable_id', '=', 'ap_payable_list.payable_id')
    .orderByRaw('ap_item.created_at ASC')
    .timeout(timeout)

    const findOne = (item_id) => knex.select(
        'item_id', 'ap_item.payable_list_id', 'ap_item.liabilities_id', 'ap_item.item_name', 'ap_item.status'
        , 'ap_liabilities.liabilities_name', 'ap_payable.name', 'ap_payable_type.status_arrear'
        , knex.raw('(SELECT name FROM ap_payable WHERE ap_payable.payable_id=ap_payable_list.payable_id) AS ap_payable_name')
        , knex.raw('(SELECT payable_type_name FROM ap_payable_type WHERE ap_payable_type.payable_type_id=ap_payable_list.payable_type_id) AS payable_type_name')
        , knex.raw('CONCAT(DATE_FORMAT(ap_item.created_at, "%d-%m-"),DATE_FORMAT(ap_item.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_item.updated_at, "%d-%m-"),DATE_FORMAT(ap_item.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_liabilities', 'ap_liabilities.liabilities_id', '=', 'ap_item.liabilities_id')
    .leftJoin('ap_payable_list', 'ap_payable_list.payable_list_id', '=', 'ap_item.payable_list_id')
    .leftJoin('ap_payable', 'ap_payable.payable_id', '=', 'ap_payable_list.payable_id')
    .leftJoin('ap_payable_type', 'ap_payable_type.payable_type_id', '=', 'ap_payable_list.payable_type_id')
    .whereRaw('ap_item.item_id = ?', [item_id])
    .timeout(timeout)

    const countWork = (item_id) => knex.count('account_payable_id AS numrow')
    .from('ap_account_payable')
    .whereRaw('item_id = ?', [item_id])
    .first()
    .timeout(timeout)

    const update = (item_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('item_id = ?', [item_id])
        .timeout(timeout)
    }

    const destroy = item_id => knex.del()
    .from(tableName)
    .whereRaw('item_id = ?', [item_id])
    .timeout(timeout)

    return {
        name, 
        create,
        countByID,
        countByName,
        findAll,
        findOne,
        countWork,
        update,
        destroy
    }
    
}