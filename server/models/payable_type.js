'use strict'

const name = 'PayableType'
const tableName = 'ap_payable_type'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (payable_type_id) => knex.count('payable_type_id AS numrow')
    .from(tableName)
    .whereRaw('payable_type_id = ?', [payable_type_id])
    .first()
    .timeout(timeout)

    const countByName = (account_id, payable_type_name) => knex.count('payable_type_id AS numrow')
    .from(tableName)
    .whereRaw('account_id = ?', [account_id])
    .whereRaw('payable_type_name = ?', [payable_type_name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select(
        'account_id', 'payable_type_name', 'status'
        , knex.raw('(SELECT account FROM ap_account WHERE ap_account.account_id=ap_payable_type.account_id) AS account')
    )
    .from(tableName)
    .orderBy('payable_type_id', 'ASC')
    .timeout(timeout)

    const findOne = (payable_type_id) => knex.select(
        'account_id', 'payable_type_name', 'status'
        , knex.raw('(SELECT account FROM ap_account WHERE ap_account.account_id=ap_payable_type.account_id) AS account')
    )
    .from(tableName)
    .whereRaw('payable_type_id = ?', [payable_type_id])
    .timeout(timeout)

    const countWork = (payable_type_id) => knex.count('payable_id AS numrow')
    .from('ap_payable_list')
    .whereRaw('payable_id = ?', [payable_type_id])
    .first()
    .timeout(timeout)

    const update = (payable_type_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('payable_type_id = ?', [payable_type_id])
        .timeout(timeout)
    }

    const destroy = payable_type_id => knex.del()
    .from(tableName)
    .whereRaw('payable_type_id = ?', [payable_type_id])
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