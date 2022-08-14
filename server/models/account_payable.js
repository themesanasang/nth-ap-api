'use strict'

const name = 'AccountPayable'
const tableName = 'ap_account_payable'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }


    const countByID = (account_payable_id) => knex.count('account_payable_id AS numrow')
    .from(tableName)
    .whereRaw('account_payable_id = ?', [account_payable_id])
    .first()
    .timeout(timeout)


    const findYearAll = () => knex.select(
        knex.raw('YEAR(payable_date) AS yearall') 
    )
    .from(tableName)
    .orderByRaw('YEAR(payable_date) DESC')
    .timeout(timeout)


    const findAll = () => knex.select(
        'ap_account_payable.*'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name', 'ap_user.fullname'
        , knex.raw('CONCAT(DATE_FORMAT(ap_item.created_at, "%d-%m-"),DATE_FORMAT(ap_item.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_item.updated_at, "%d-%m-"),DATE_FORMAT(ap_item.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .leftJoin('ap_user', 'ap_user.uuid', '=', 'ap_account_payable.uuid')
    .orderByRaw('ap_account_payable.account_payable_id ASC')
    .timeout(timeout)


    const findAllCondition = (type, year) => knex.select(
        'ap_account_payable.*'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name', 'ap_user.fullname', 'ap_payable_type.payable_type_name'
        , knex.raw('(ap_account_payable.amount - ap_account_payable.pay_amount) AS balance')
        , knex.raw('CONCAT(DATE_FORMAT(ap_item.created_at, "%d-%m-"),DATE_FORMAT(ap_item.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_item.updated_at, "%d-%m-"),DATE_FORMAT(ap_item.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_payable_list', 'ap_payable_list.payable_list_id', '=', 'ap_item.payable_list_id')
    .leftJoin('ap_payable_type', 'ap_payable_type.payable_type_id', '=', 'ap_payable_list.payable_type_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .leftJoin('ap_user', 'ap_user.uuid', '=', 'ap_account_payable.uuid')
    .whereRaw('ap_payable_type.payable_type_id = ?', [type])
    .whereRaw('YEAR(ap_account_payable.payable_date) = ?', [year])
    .orderByRaw('ap_account_payable.account_payable_id ASC')
    .timeout(timeout)


    const findOne = (account_payable_id) => knex.select(
        '*'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name', 'ap_user.fullname'
        , knex.raw('CONCAT(DATE_FORMAT(ap_item.created_at, "%d-%m-"),DATE_FORMAT(ap_item.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_item.updated_at, "%d-%m-"),DATE_FORMAT(ap_item.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .leftJoin('ap_user', 'ap_user.uuid', '=', 'ap_account_payable.uuid')
    .whereRaw('ap_account_payable.account_payable_id = ?', [account_payable_id])
    .timeout(timeout)


    const update = (account_payable_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('account_payable_id = ?', [account_payable_id])
        .timeout(timeout)
    }


    const destroy = account_payable_id => knex.del()
    .from(tableName)
    .whereRaw('account_payable_id = ?', [account_payable_id])
    .timeout(timeout)


    return {
        name, 
        create,
        countByID,
        findYearAll,
        findAllCondition,
        findAll,
        findOne,
        update,
        destroy
    }
    
}