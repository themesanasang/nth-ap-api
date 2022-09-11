'use strict'

const name = 'AccountPayableArrear'
const tableName = 'ap_account_payable_arrear'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }


    const countByID = (arrear_id) => knex.count('arrear_id AS numrow')
    .from(tableName)
    .whereRaw('arrear_id = ?', [arrear_id])
    .first()
    .timeout(timeout)


    const countByAPID = (account_payable_id) => knex.count('account_payable_id AS numrow')
    .from(tableName)
    .whereRaw('account_payable_id = ?', [account_payable_id])
    .first()
    .timeout(timeout)


    const countYearAll = (year) => knex.count('arrear_id AS numrow')
    .from(tableName)
    .whereRaw('YEAR(arrear_date) = ?', [year])
    .first()
    .timeout(timeout)


    const findAll = () => knex.select(
        'ap_account_payable_arrear.*'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name'
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear.arrear_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear.arrear_date, "%Y")+543) AS arrear_date') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear.paid_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear.paid_date, "%Y")+543) AS paid_date') 
    )
    .from(tableName)
    .leftJoin('ap_account_payable', 'ap_account_payable.account_payable_id', '=', 'ap_account_payable_arrear.account_payable_id')
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .whereRaw('ap_account_payable_arrear.paid = "N"')
    .orderByRaw('ap_account_payable_arrear.arrear_id ASC')
    .timeout(timeout)


    const findAllByType = (type) => knex.select(
        'ap_account_payable_arrear.*'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name'
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear.arrear_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear.arrear_date, "%Y")+543) AS arrear_date') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear.paid_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear.paid_date, "%Y")+543) AS paid_date') 
    )
    .from(tableName)
    .leftJoin('ap_account_payable', 'ap_account_payable.account_payable_id', '=', 'ap_account_payable_arrear.account_payable_id')
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_payable_list', 'ap_payable_list.payable_list_id', '=', 'ap_item.payable_list_id')
    .leftJoin('ap_payable_type', 'ap_payable_type.payable_type_id', '=', 'ap_payable_list.payable_type_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .whereRaw('ap_account_payable_arrear.paid = "N"')
    .whereRaw('ap_payable_type.payable_type_id = ?', [type])
    .orderByRaw('ap_account_payable_arrear.arrear_id ASC')
    .timeout(timeout)



    const findOne = (arrear_id) => knex.select(
        'ap_account_payable_arrear.*'
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name'
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear.arrear_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear.arrear_date, "%Y")+543) AS arrear_date') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_arrear.paid_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_arrear.paid_date, "%Y")+543) AS paid_date') 
    )
    .from(tableName)
    .leftJoin('ap_account_payable', 'ap_account_payable.account_payable_id', '=', 'ap_account_payable_arrear.account_payable_id')
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .whereRaw('ap_account_payable_arrear.arrear_id = ?', [arrear_id])
    .timeout(timeout)


    const update = (arrear_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('arrear_id = ?', [arrear_id])
        .timeout(timeout)
    }


    const destroy = arrear_id => knex.del()
    .from(tableName)
    .whereRaw('arrear_id = ?', [arrear_id])
    .timeout(timeout)


    const destroyByAP = account_payable_id => knex.del()
    .from(tableName)
    .whereRaw('account_payable_id = ?', [account_payable_id])
    .timeout(timeout)


    return {
        name, 
        create,
        countByID,
        countByAPID,
        countYearAll,
        findAll,
        findAllByType,
        findOne,
        update,
        destroy,
        destroyByAP
    }
    
}