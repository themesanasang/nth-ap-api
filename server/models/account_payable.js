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


    const countByCode = (ap_code) => knex.count('ap_code AS numrow')
    .from(tableName)
    .whereRaw('ap_code = ?', [ap_code])
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
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.data_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.data_date, "%Y")+543) AS date_data') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.payable_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.payable_date, "%Y")+543) AS date_payable') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.round_date_start, "%d-%m-"),DATE_FORMAT(ap_account_payable.round_date_start, "%Y")+543) AS date_round_start') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.round_date_end, "%d-%m-"),DATE_FORMAT(ap_account_payable.round_date_end, "%Y")+543) AS date_round_end') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.bill_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.bill_date, "%Y")+543) AS date_bill') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.pay_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.pay_date, "%Y")+543) AS date_pay') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.limit_day, "%d-%m-"),DATE_FORMAT(ap_account_payable.limit_day, "%Y")+543) AS date_limit_day') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.complete_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.complete_date, "%Y")+543) AS date_complete') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.created_at, "%d-%m-"),DATE_FORMAT(ap_account_payable.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.updated_at, "%d-%m-"),DATE_FORMAT(ap_account_payable.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .leftJoin('ap_user', 'ap_user.uuid', '=', 'ap_account_payable.uuid')
    .orderByRaw('ap_account_payable.account_payable_id ASC')
    .timeout(timeout)


    const findAllConditionYearAll = (year) => knex.select(
        'ap_account_payable.*'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name', 'ap_user.fullname', 'ap_payable_type.payable_type_name'
        , knex.raw('(ap_account_payable.amount - IF(ISNULL(ap_account_payable.pay_amount),0,ap_account_payable.pay_amount)) AS balance')
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.data_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.data_date, "%Y")+543) AS date_data') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.payable_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.payable_date, "%Y")+543) AS date_payable') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.round_date_start, "%d-%m-"),DATE_FORMAT(ap_account_payable.round_date_start, "%Y")+543) AS date_round_start') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.round_date_end, "%d-%m-"),DATE_FORMAT(ap_account_payable.round_date_end, "%Y")+543) AS date_round_end') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.bill_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.bill_date, "%Y")+543) AS date_bill') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.pay_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.pay_date, "%Y")+543) AS date_pay') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.limit_day, "%d-%m-"),DATE_FORMAT(ap_account_payable.limit_day, "%Y")+543) AS date_limit_day') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.complete_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.complete_date, "%Y")+543) AS date_complete') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.created_at, "%d-%m-"),DATE_FORMAT(ap_account_payable.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.updated_at, "%d-%m-"),DATE_FORMAT(ap_account_payable.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_payable_list', 'ap_payable_list.payable_list_id', '=', 'ap_item.payable_list_id')
    .leftJoin('ap_payable_type', 'ap_payable_type.payable_type_id', '=', 'ap_payable_list.payable_type_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .leftJoin('ap_user', 'ap_user.uuid', '=', 'ap_account_payable.uuid')
    .whereRaw('YEAR(ap_account_payable.payable_date) = ?', [year])
    .orderByRaw('ap_account_payable.account_payable_id ASC')
    .timeout(timeout)


    const findAllConditionTypeYear = (type, year) => knex.select(
        'ap_account_payable.*'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name', 'ap_user.fullname', 'ap_payable_type.payable_type_name'
        , knex.raw('(ap_account_payable.amount - IF(ISNULL(ap_account_payable.pay_amount),0,ap_account_payable.pay_amount)) AS balance')
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.data_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.data_date, "%Y")+543) AS date_data') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.payable_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.payable_date, "%Y")+543) AS date_payable') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.round_date_start, "%d-%m-"),DATE_FORMAT(ap_account_payable.round_date_start, "%Y")+543) AS date_round_start') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.round_date_end, "%d-%m-"),DATE_FORMAT(ap_account_payable.round_date_end, "%Y")+543) AS date_round_end') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.bill_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.bill_date, "%Y")+543) AS date_bill') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.pay_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.pay_date, "%Y")+543) AS date_pay') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.limit_day, "%d-%m-"),DATE_FORMAT(ap_account_payable.limit_day, "%Y")+543) AS date_limit_day') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.complete_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.complete_date, "%Y")+543) AS date_complete') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.created_at, "%d-%m-"),DATE_FORMAT(ap_account_payable.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.updated_at, "%d-%m-"),DATE_FORMAT(ap_account_payable.updated_at, "%Y")+543) AS date_update') 
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


    const findOne = (ap_code) => knex.select(
        'ap_account_payable.*'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name', 'ap_user.fullname'
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.data_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.data_date, "%Y")+543) AS date_data') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.payable_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.payable_date, "%Y")+543) AS date_payable') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.round_date_start, "%d-%m-"),DATE_FORMAT(ap_account_payable.round_date_start, "%Y")+543) AS date_round_start') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.round_date_end, "%d-%m-"),DATE_FORMAT(ap_account_payable.round_date_end, "%Y")+543) AS date_round_end') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.bill_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.bill_date, "%Y")+543) AS date_bill') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.pay_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.pay_date, "%Y")+543) AS date_pay') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.limit_day, "%d-%m-"),DATE_FORMAT(ap_account_payable.limit_day, "%Y")+543) AS date_limit_day') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.complete_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.complete_date, "%Y")+543) AS date_complete') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.created_at, "%d-%m-"),DATE_FORMAT(ap_account_payable.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.updated_at, "%d-%m-"),DATE_FORMAT(ap_account_payable.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .leftJoin('ap_user', 'ap_user.uuid', '=', 'ap_account_payable.uuid')
    .whereRaw('ap_account_payable.ap_code = ?', [ap_code])
    .timeout(timeout)


    const updateByCode = (ap_code, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('ap_code = ?', [ap_code])
        .timeout(timeout)
    }


    const destroyByCode = ap_code => knex.del()
    .from(tableName)
    .whereRaw('ap_code = ?', [ap_code])
    .timeout(timeout)


    return {
        name, 
        create,
        countByCode,
        findYearAll,
        findAllConditionYearAll,
        findAllConditionTypeYear,
        findAll,
        findOne,
        updateByCode,
        destroyByCode
    }
    
}