'use strict'

const name = 'Account'
const tableName = 'ap_account'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (account_id) => knex.count('account_id AS numrow')
    .from(tableName)
    .whereRaw('account_id = ?', [account_id])
    .first()
    .timeout(timeout)

    const countByCode = (account) => knex.count('account AS numrow')
    .from(tableName)
    .whereRaw('account = ?', [account])
    .first()
    .timeout(timeout)

    const countByName = (account_name) => knex.count('account_name AS numrow')
    .from(tableName)
    .whereRaw('account_name = ?', [account_name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select(
        'account_id', 'account', 'account_name', 'account_old', 'ap_account.status'
        , 'ap_account.gf_id', 'ap_account_gf.gf_code', 'ap_account.acc_main_id', 'ap_account_main.acc_main_code'
        , knex.raw('CONCAT(DATE_FORMAT(created_at, "%d-%m-"),DATE_FORMAT(created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(updated_at, "%d-%m-"),DATE_FORMAT(updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_account_gf', 'ap_account_gf.gf_id', '=', 'ap_account.gf_id')
    .leftJoin('ap_account_main', 'ap_account_main.acc_main_id', '=', 'ap_account.acc_main_id')
    .orderBy('account_id', 'ASC')
    .timeout(timeout)

    const findOne = (account_id) => knex.select(
        'account_id', 'account', 'account_name', 'account_old', 'ap_account.status'
        , 'ap_account.gf_id', 'ap_account_gf.gf_name', 'ap_account_gf.gf_code', 'ap_account.acc_main_id', 'ap_account_main.acc_main_code', 'ap_account_main.acc_main_name'
        , knex.raw('CONCAT(DATE_FORMAT(created_at, "%d-%m-"),DATE_FORMAT(created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(updated_at, "%d-%m-"),DATE_FORMAT(updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .leftJoin('ap_account_gf', 'ap_account_gf.gf_id', '=', 'ap_account.gf_id')
    .leftJoin('ap_account_main', 'ap_account_main.acc_main_id', '=', 'ap_account.acc_main_id')
    .whereRaw('account_id = ?', [account_id])
    .timeout(timeout)

    const countWork = (account_id) => knex.count('account_id AS numrow')
    .from('ap_payable_type')
    .whereRaw('account_id = ?', [account_id])
    .first()
    .timeout(timeout)

    const update = (account_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('account_id = ?', [account_id])
        .timeout(timeout)
    }

    const destroy = account_id => knex.del()
    .from(tableName)
    .whereRaw('account_id = ?', [account_id])
    .timeout(timeout)

    return {
        name, 
        create,
        countByID,
        countByCode,
        countByName,
        findAll,
        findOne,
        countWork,
        update,
        destroy
    }
    
}