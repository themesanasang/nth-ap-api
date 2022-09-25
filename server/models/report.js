'use strict'

const name = 'Report'
const timeout = 2000

module.exports = knex => {

    
    const reportGF = (gf, dateStart, dateEnd) => knex.select(
        'ap_account_gf.gf_name', 'ap_account_gf.gf_code', 'ap_account.account', 'ap_item.item_name'
        , knex.raw('sum(ap_account_payable.amount) as sum_amount')    
    )
    .from('ap_account_payable')
    .leftJoin('ap_item', 'ap_item.item_id', '=', 'ap_account_payable.item_id')
    .leftJoin('ap_payable_list', 'ap_payable_list.payable_list_id', '=', 'ap_item.payable_list_id')
    .leftJoin('ap_payable_type', 'ap_payable_type.payable_type_id', '=', 'ap_payable_list.payable_type_id')
    .leftJoin('ap_account', 'ap_account.account_id', '=', 'ap_payable_type.account_id')
    .leftJoin('ap_account_gf', 'ap_account_gf.gf_id', '=', 'ap_account.gf_id')
    .whereRaw('ap_account_gf.gf_id in ('+gf+')')
    .whereRaw('ap_account_payable.payable_date between "'+dateStart+'" and "'+dateEnd+'"')
    .groupByRaw('ap_account.account')
    .orderByRaw('ap_account_gf.gf_id ASC')
    .timeout(timeout)

    return {
        name, 
        reportGF
    }
    
}