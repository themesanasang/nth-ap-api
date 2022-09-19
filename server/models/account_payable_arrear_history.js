'use strict'

const name = 'AccountPayableArrearHistory'
const tableName = 'ap_account_payable_arrear_history'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }


    const countByID = (arrear_history_id) => knex.count('arrear_history_id AS numrow')
    .from(tableName)
    .whereRaw('arrear_history_id = ?', [arrear_history_id])
    .first()
    .timeout(timeout)


    const countByID2 = (account_payable_history_id) => knex.count('account_payable_history_id AS numrow')
    .from(tableName)
    .whereRaw('account_payable_history_id = ?', [account_payable_history_id])
    .first()
    .timeout(timeout)


    const countByAPCode = (ap_code) => knex.count('ap_code AS numrow')
    .from(tableName)
    .whereRaw('ap_code = ?', [ap_code])
    .first()
    .timeout(timeout)


    const countYearAll = (year) => knex.count('arrear_history_id AS numrow')
    .from(tableName)
    .whereRaw('YEAR(arrear_date) = ?', [year])
    .first()
    .timeout(timeout)


    const findAll = () => knex.select(
        'ap_account_payable_arrear_history.arrear_history_id', 'ap_account_payable_arrear_history.account_payable_history_id', 'ap_account_payable_arrear_history.ap_code'
        , knex.raw('DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%Y-%m-%d") AS arrear_date')
        ,'ap_account_payable_arrear_history.amount', 'ap_account_payable_arrear_history.uuid_created', 'ap_account_payable_arrear_history.paid'
        ,'ap_account_payable_arrear_history.paid_amount' , knex.raw('DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%Y-%m-%d") AS paid_date'), 'ap_account_payable_arrear_history.uuid_complete'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name'
        , knex.raw('(ap_account_payable_arrear_history.amount - ap_account_payable_arrear_history.paid_amount) as arrear_balance')
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%Y")+543) AS date_arrear') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%Y")+543) AS date_paid') 
    )
    .from(tableName)
    .leftJoin('ap_account_payable', 'ap_account_payable.ap_code', '=', 'ap_account_payable_arrear_history.ap_code')
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .orderByRaw('ap_account_payable_arrear_history.arrear_history_id ASC')
    .timeout(timeout)


    const findAllByType = (type) => knex.select(
        'ap_account_payable_arrear_history.arrear_history_id', 'ap_account_payable_arrear_history.account_payable_history_id', 'ap_account_payable_arrear_history.ap_code'
        , knex.raw('DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%Y-%m-%d") AS arrear_date')
        ,'ap_account_payable_arrear_history.amount', 'ap_account_payable_arrear_history.uuid_created', 'ap_account_payable_arrear_history.paid'
        ,'ap_account_payable_arrear_history.paid_amount' , knex.raw('DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%Y-%m-%d") AS paid_date'), 'ap_account_payable_arrear_history.uuid_complete'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name'
        , knex.raw('(ap_account_payable_arrear_history.amount - ap_account_payable_arrear_history.paid_amount) as arrear_balance')
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%Y")+543) AS date_arrear') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%Y")+543) AS date_paid') 
    )
    .from(tableName)
    .leftJoin('ap_account_payable', 'ap_account_payable.ap_code', '=', 'ap_account_payable_arrear_history.ap_code')
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_payable_list', 'ap_payable_list.payable_list_id', '=', 'ap_item.payable_list_id')
    .leftJoin('ap_payable_type', 'ap_payable_type.payable_type_id', '=', 'ap_payable_list.payable_type_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .whereRaw('ap_payable_type.payable_type_id = ?', [type])
    .orderByRaw('ap_account_payable_arrear_history.arrear_history_id ASC')
    .timeout(timeout)



    const findOne = (account_payable_history_id) => knex.select(
        'ap_account_payable_arrear_history.arrear_history_id', 'ap_account_payable_arrear_history.account_payable_history_id', 'ap_account_payable_arrear_history.ap_code'
        , knex.raw('DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%Y-%m-%d") AS arrear_date')
        ,'ap_account_payable_arrear_history.amount', 'ap_account_payable_arrear_history.uuid_created', 'ap_account_payable_arrear_history.paid'
        ,'ap_account_payable_arrear_history.paid_amount' , knex.raw('DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%Y-%m-%d") AS paid_date'), 'ap_account_payable_arrear_history.uuid_complete'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name'
        , knex.raw('(ap_account_payable_arrear_history.amount - ap_account_payable_arrear_history.paid_amount) as arrear_balance')
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%Y")+543) AS date_arrear') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%Y")+543) AS date_paid') 
    )
    .from(tableName)
    .leftJoin('ap_account_payable', 'ap_account_payable.ap_code', '=', 'ap_account_payable_arrear_history.ap_code')
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .whereRaw('ap_account_payable_arrear_history.account_payable_history_id = ?', [account_payable_history_id])
    .timeout(timeout)


    const findOneByCode = (ap_code) => knex.select(
        'ap_account_payable_arrear_history.arrear_history_id', 'ap_account_payable_arrear_history.account_payable_history_id', 'ap_account_payable_arrear_history.ap_code'
        , knex.raw('DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%Y-%m-%d") AS arrear_date')
        ,'ap_account_payable_arrear_history.amount', 'ap_account_payable_arrear_history.uuid_created', 'ap_account_payable_arrear_history.paid'
        ,'ap_account_payable_arrear_history.paid_amount' , knex.raw('DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%Y-%m-%d") AS paid_date'), 'ap_account_payable_arrear_history.uuid_complete'
        , 'ap_account_payable.ap_code', 'ap_item.item_name', 'ap_department_sub.department_sub_name'
        , knex.raw('(ap_account_payable_arrear_history.amount - ap_account_payable_arrear_history.paid_amount) as arrear_balance')
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear_history.arrear_date, "%Y")+543) AS date_arrear') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear_history.paid_date, "%Y")+543) AS date_paid') 
    )
    .from(tableName)
    .leftJoin('ap_account_payable', 'ap_account_payable.ap_code', '=', 'ap_account_payable_arrear_history.ap_code')
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .whereRaw('ap_account_payable_arrear_history.ap_code = ?', [ap_code])
    .timeout(timeout)


    const destroyByAP = ap_code => knex.del()
    .from(tableName)
    .whereRaw('ap_code = ?', [ap_code])
    .timeout(timeout)


    const destroyByID2 = account_payable_history_id => knex.del()
    .from(tableName)
    .whereRaw('account_payable_history_id = ?', [account_payable_history_id])
    .timeout(timeout)



    return {
        name, 
        create,
        countByID,
        countByID2,
        countByAPCode,
        countYearAll,
        findAll,
        findAllByType,
        findOne,
        findOneByCode,
        destroyByAP,
        destroyByID2
    }
    
}