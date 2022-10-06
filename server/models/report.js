'use strict'

const name = 'Report'
const timeout = 2000

module.exports = knex => {

    
    const reportGF = (gf, dateStart, dateEnd) => knex.select(
        'ap_account_gf.gf_name', 'ap_account_gf.gf_code', 'ap_account.account', 'ap_payable_type.payable_type_name'
        , knex.raw('SUM(((IF(ISNULL(ap_account_payable.receive_amount),0,ap_account_payable.receive_amount)+IF(ISNULL(ap_account_payable.amount),0,ap_account_payable.amount)) - IF(ISNULL(ap_account_payable.pay_amount),0,ap_account_payable.pay_amount))) AS sum_balance')
    )
    .from('ap_account_payable')
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_payable_list', 'ap_payable_list.payable_list_id', '=', 'ap_item.payable_list_id')
    .leftJoin('ap_payable_type', 'ap_payable_type.payable_type_id', '=', 'ap_payable_list.payable_type_id')
    .leftJoin('ap_account', 'ap_account.account_id', '=', 'ap_payable_type.account_id')
    .leftJoin('ap_account_gf', 'ap_account_gf.gf_id', '=', 'ap_account.gf_id')
    .whereRaw('ap_account_gf.gf_id in ('+gf+')')
    .whereRaw('ap_account_payable.payable_date between "'+dateStart+'" and "'+dateEnd+'"')
    .groupByRaw('ap_payable_type.payable_type_name')
    .orderByRaw('ap_account_gf.gf_id ASC')
    .timeout(timeout)



    const reportPayableType = (type, dateStart, dateEnd) => knex.select(
        knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.payable_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.payable_date, "%Y")+543) AS payable_date') 
        , 'ap_payable.name', 'ap_item.item_name', 'ap_account_payable.receive_amount', 'ap_account_payable.delivery_note_number', 'ap_account_payable.amount'
        , 'ap_department_sub.department_sub_name', 'ap_account_payable.invoice_no'
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.bill_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.bill_date, "%Y")+543) AS bill_date')
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.pay_date, "%d-%m-"),DATE_FORMAT(ap_account_payable.pay_date, "%Y")+543) AS pay_date') 
        , 'ap_account_payable.payment_voucher', 'ap_account_payable.pay_amount' 
        , knex.raw('CONCAT(DATE_FORMAT(ap_account_payable.limit_day, "%d-%m-"),DATE_FORMAT(ap_account_payable.limit_day, "%Y")+543) AS limit_day') 
    )
    .from('ap_account_payable')
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_payable_list', 'ap_payable_list.payable_list_id', '=', 'ap_item.payable_list_id')
    .leftJoin('ap_payable_type', 'ap_payable_type.payable_type_id', '=', 'ap_payable_list.payable_type_id')
    .leftJoin('ap_payable', 'ap_payable.payable_id', '=', 'ap_payable_list.payable_id')
    .leftJoin('ap_department_sub', 'ap_department_sub.department_sub_id', '=', 'ap_account_payable.department_sub_id')
    .whereRaw('ap_payable_type.payable_type_id in ('+type+')')
    .whereRaw('ap_account_payable.payable_date between "'+dateStart+'" and "'+dateEnd+'"')
    .orderByRaw('ap_account_payable.payable_date ASC')
    .timeout(timeout)

    


    return {
        name, 
        reportGF,
        reportPayableType
    }
    
}