'use strict'

const name = 'AccountPayableHistory'
const tableName = 'ap_account_payable_history'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .returning('account_payable_history_id')
        .into(tableName)
        .timeout(timeout)
    }


    const countByID = (account_payable_history_id) => knex.count('account_payable_history_id AS numrow')
    .from(tableName)
    .whereRaw('account_payable_history_id = ?', [account_payable_history_id])
    .first()
    .timeout(timeout)


    const countByCode = (ap_code) => knex.count('ap_code AS numrow')
    .from(tableName)
    .whereRaw('ap_code = ?', [ap_code])
    .first()
    .timeout(timeout)


    const findMinID = (ap_code) => knex.select(
        'account_payable_history_id'
    )
    .from(tableName)
    .whereRaw('ap_code = ?', [ap_code])
    .orderByRaw('account_payable_history_id ASC')
    .first()
    .timeout(timeout)


    const findYearAll = () => knex.select(
        knex.raw('YEAR(payable_date) AS yearall') 
    )
    .from(tableName)
    .orderByRaw('YEAR(payable_date) DESC')
    .timeout(timeout)


    const findAll = () => knex.select(
        'ap_account_payable_history.account_payable_history_id'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.history_date, "%Y-%m-%d") AS history_date'), 'ap_account_payable_history.history_time', 'ap_account_payable_history.ap_code'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.data_date, "%Y-%m-%d") AS data_date'), knex.raw('DATE_FORMAT(ap_account_payable_history.payable_date, "%Y-%m-%d") AS payable_date')
        , knex.raw('DATE_FORMAT(ap_account_payable_history.round_date_start, "%Y-%m-%d") AS round_date_start'), knex.raw('DATE_FORMAT(ap_account_payable_history.round_date_end, "%Y-%m-%d") AS round_date_end')
        , 'ap_account_payable_history.item_id', 'ap_account_payable_history.department_sub_id', 'ap_account_payable_history.book_number'
        , 'ap_account_payable_history.delivery_note_number', 'ap_account_payable_history.receive_amount', 'ap_account_payable_history.amount'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.bill_date, "%Y-%m-%d") AS bill_date'), knex.raw('DATE_FORMAT(ap_account_payable_history.pay_date, "%Y-%m-%d") AS pay_date')
        , 'ap_account_payable_history.payment_voucher', 'ap_account_payable_history.invoice_no', 'ap_account_payable_history.pay_amount'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.limit_day, "%Y-%m-%d") AS limit_day'), 'ap_account_payable_history.comment', 'ap_account_payable.complete'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.complete_date, "%Y-%m-%d") AS complete_date'), 'ap_account_payable_history.uuid'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.created_at, "%Y-%m-%d %H-%i-%s") AS created_at'), knex.raw('DATE_FORMAT(ap_account_payable_history.updated_at, "%Y-%m-%d %H-%i-%s") AS updated_at')
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name', 'ap_user.fullname'
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.data_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.data_date, "%Y")+543) AS date_data') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.payable_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.payable_date, "%Y")+543) AS date_payable') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.round_date_start, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.round_date_start, "%Y")+543) AS date_round_start') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.round_date_end, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.round_date_end, "%Y")+543) AS date_round_end') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.bill_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.bill_date, "%Y")+543) AS date_bill') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.pay_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.pay_date, "%Y")+543) AS date_pay') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.limit_day, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.limit_day, "%Y")+543) AS date_limit_day') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.complete_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.complete_date, "%Y")+543) AS date_complete') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.created_at, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.updated_at, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable_history.item_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable_history.department_sub_id')
    .leftJoin('ap_user', 'ap_user.uuid', '=', 'ap_account_payable_history.uuid')
    .orderByRaw('ap_account_payable_history.account_payable_history_id ASC')
    .timeout(timeout)


    const findAllConditionYearAll = (year) => knex.select(
        'ap_account_payable_history.account_payable_history_id'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.history_date, "%Y-%m-%d") AS history_date'), 'ap_account_payable_history.history_time', 'ap_account_payable_history.ap_code'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.data_date, "%Y-%m-%d") AS data_date'), knex.raw('DATE_FORMAT(ap_account_payable_history.payable_date, "%Y-%m-%d") AS payable_date')
        , knex.raw('DATE_FORMAT(ap_account_payable_history.round_date_start, "%Y-%m-%d") AS round_date_start'), knex.raw('DATE_FORMAT(ap_account_payable_history.round_date_end, "%Y-%m-%d") AS round_date_end')
        , 'ap_account_payable_history.item_id', 'ap_account_payable_history.department_sub_id', 'ap_account_payable_history.book_number'
        , 'ap_account_payable_history.delivery_note_number', 'ap_account_payable_history.receive_amount', 'ap_account_payable_history.amount'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.bill_date, "%Y-%m-%d") AS bill_date'), knex.raw('DATE_FORMAT(ap_account_payable_history.pay_date, "%Y-%m-%d") AS pay_date')
        , 'ap_account_payable_history.payment_voucher', 'ap_account_payable_history.invoice_no', 'ap_account_payable_history.pay_amount'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.limit_day, "%Y-%m-%d") AS limit_day'), 'ap_account_payable_history.comment', 'ap_account_payable.complete'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.complete_date, "%Y-%m-%d") AS complete_date'), 'ap_account_payable_history.uuid'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.created_at, "%Y-%m-%d %H-%i-%s") AS created_at'), knex.raw('DATE_FORMAT(ap_account_payable_history.updated_at, "%Y-%m-%d %H-%i-%s") AS updated_at')
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name', 'ap_user.fullname', 'ap_payable_type.payable_type_name'
        , knex.raw('(ap_account_payable_history.amount - IF(ISNULL(ap_account_payable_history.pay_amount),0,ap_account_payable_history.pay_amount)) AS balance')
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.data_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.data_date, "%Y")+543) AS date_data') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.payable_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.payable_date, "%Y")+543) AS date_payable') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.round_date_start, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.round_date_start, "%Y")+543) AS date_round_start') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.round_date_end, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.round_date_end, "%Y")+543) AS date_round_end') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.bill_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.bill_date, "%Y")+543) AS date_bill') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.pay_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.pay_date, "%Y")+543) AS date_pay') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.limit_day, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.limit_day, "%Y")+543) AS date_limit_day') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.complete_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.complete_date, "%Y")+543) AS date_complete') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.created_at, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.updated_at, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable_history.item_id')
    .leftJoin('ap_payable_list', 'ap_payable_list.payable_list_id', '=', 'ap_item.payable_list_id')
    .leftJoin('ap_payable_type', 'ap_payable_type.payable_type_id', '=', 'ap_payable_list.payable_type_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable_history.department_sub_id')
    .leftJoin('ap_user', 'ap_user.uuid', '=', 'ap_account_payable_history.uuid')
    .whereRaw('YEAR(ap_account_payable_history.payable_date) = ?', [year])
    .orderByRaw('ap_account_payable_history.account_payable_history_id ASC')
    .timeout(timeout)


    const findAllConditionTypeYear = (type, year) => knex.select(
        'ap_account_payable_history.account_payable_history_id'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.history_date, "%Y-%m-%d") AS history_date'), 'ap_account_payable_history.history_time', 'ap_account_payable_history.ap_code'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.data_date, "%Y-%m-%d") AS data_date'), knex.raw('DATE_FORMAT(ap_account_payable_history.payable_date, "%Y-%m-%d") AS payable_date')
        , knex.raw('DATE_FORMAT(ap_account_payable_history.round_date_start, "%Y-%m-%d") AS round_date_start'), knex.raw('DATE_FORMAT(ap_account_payable_history.round_date_end, "%Y-%m-%d") AS round_date_end')
        , 'ap_account_payable_history.item_id', 'ap_account_payable_history.department_sub_id', 'ap_account_payable_history.book_number'
        , 'ap_account_payable_history.delivery_note_number', 'ap_account_payable_history.receive_amount', 'ap_account_payable_history.amount'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.bill_date, "%Y-%m-%d") AS bill_date'), knex.raw('DATE_FORMAT(ap_account_payable_history.pay_date, "%Y-%m-%d") AS pay_date')
        , 'ap_account_payable_history.payment_voucher', 'ap_account_payable_history.invoice_no', 'ap_account_payable_history.pay_amount'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.limit_day, "%Y-%m-%d") AS limit_day'), 'ap_account_payable_history.comment', 'ap_account_payable.complete'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.complete_date, "%Y-%m-%d") AS complete_date'), 'ap_account_payable_history.uuid'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.created_at, "%Y-%m-%d %H-%i-%s") AS created_at'), knex.raw('DATE_FORMAT(ap_account_payable_history.updated_at, "%Y-%m-%d %H-%i-%s") AS updated_at')
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name', 'ap_user.fullname', 'ap_payable_type.payable_type_name'
        , knex.raw('(ap_account_payable_history.amount - IF(ISNULL(ap_account_payable_history.pay_amount),0,ap_account_payable_history.pay_amount)) AS balance')
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.data_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.data_date, "%Y")+543) AS date_data') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.payable_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.payable_date, "%Y")+543) AS date_payable') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.round_date_start, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.round_date_start, "%Y")+543) AS date_round_start') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.round_date_end, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.round_date_end, "%Y")+543) AS date_round_end') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.bill_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.bill_date, "%Y")+543) AS date_bill') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.pay_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.pay_date, "%Y")+543) AS date_pay') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.limit_day, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.limit_day, "%Y")+543) AS date_limit_day') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.complete_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.complete_date, "%Y")+543) AS date_complete') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.created_at, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.updated_at, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable_history.item_id')
    .leftJoin('ap_payable_list', 'ap_payable_list.payable_list_id', '=', 'ap_item.payable_list_id')
    .leftJoin('ap_payable_type', 'ap_payable_type.payable_type_id', '=', 'ap_payable_list.payable_type_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable_history.department_sub_id')
    .leftJoin('ap_user', 'ap_user.uuid', '=', 'ap_account_payable_history.uuid')
    .whereRaw('ap_payable_type.payable_type_id = ?', [type])
    .whereRaw('YEAR(ap_account_payable_history.payable_date) = ?', [year])
    .orderByRaw('ap_account_payable_history.account_payable_history_id ASC')
    .timeout(timeout)


    const findOne = (ap_code) => knex.select(
        'ap_account_payable_history.account_payable_history_id'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.history_date, "%Y-%m-%d") AS history_date'), 'ap_account_payable_history.history_time', 'ap_account_payable_history.ap_code'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.data_date, "%Y-%m-%d") AS data_date'), knex.raw('DATE_FORMAT(ap_account_payable_history.payable_date, "%Y-%m-%d") AS payable_date')
        , knex.raw('DATE_FORMAT(ap_account_payable_history.round_date_start, "%Y-%m-%d") AS round_date_start'), knex.raw('DATE_FORMAT(ap_account_payable_history.round_date_end, "%Y-%m-%d") AS round_date_end')
        , 'ap_account_payable_history.item_id', 'ap_account_payable_history.department_sub_id', 'ap_account_payable_history.book_number'
        , 'ap_account_payable_history.delivery_note_number', 'ap_account_payable_history.receive_amount', 'ap_account_payable_history.amount'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.bill_date, "%Y-%m-%d") AS bill_date'), knex.raw('DATE_FORMAT(ap_account_payable_history.pay_date, "%Y-%m-%d") AS pay_date')
        , 'ap_account_payable_history.payment_voucher', 'ap_account_payable_history.invoice_no', 'ap_account_payable_history.pay_amount'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.limit_day, "%Y-%m-%d") AS limit_day'), 'ap_account_payable_history.comment', 'ap_account_payable.complete'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.complete_date, "%Y-%m-%d") AS complete_date'), 'ap_account_payable_history.uuid'
        , knex.raw('DATE_FORMAT(ap_account_payable_history.created_at, "%Y-%m-%d %H-%i-%s") AS created_at'), knex.raw('DATE_FORMAT(ap_account_payable_history.updated_at, "%Y-%m-%d %H-%i-%s") AS updated_at')
        , 'ap_item.item_name', 'ap_department_sub.department_sub_name', 'ap_user.fullname'
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.data_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.data_date, "%Y")+543) AS date_data') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.payable_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.payable_date, "%Y")+543) AS date_payable') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.round_date_start, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.round_date_start, "%Y")+543) AS date_round_start') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.round_date_end, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.round_date_end, "%Y")+543) AS date_round_end') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.bill_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.bill_date, "%Y")+543) AS date_bill') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.pay_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.pay_date, "%Y")+543) AS date_pay') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.limit_day, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.limit_day, "%Y")+543) AS date_limit_day') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.complete_date, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.complete_date, "%Y")+543) AS date_complete') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.created_at, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable_history.updated_at, "%d-%m-"),DATE_FORMAT(ap_account_payable_history.updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable_history.item_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable_history.department_sub_id')
    .leftJoin('ap_user', 'ap_user.uuid', '=', 'ap_account_payable_history.uuid')
    .whereRaw('ap_account_payable_history.ap_code = ?', [ap_code])
    .orderByRaw('ap_account_payable_history.account_payable_history_id ASC')
    .timeout(timeout)


    const destroyByID = account_payable_history_id => knex.del()
    .from(tableName)
    .whereRaw('account_payable_history_id = ?', [account_payable_history_id])
    .timeout(timeout)


    const destroyArrearByID = account_payable_history_id => knex.del()
    .from('ap_account_payable_arrear_history')
    .whereRaw('account_payable_history_id = ?', [account_payable_history_id])
    .timeout(timeout)



    return {
        name, 
        create,
        countByID,
        countByCode,
        findMinID,
        findYearAll,
        findAllConditionYearAll,
        findAllConditionTypeYear,
        findAll,
        findOne,
        destroyByID,
        destroyArrearByID
    }
    
}