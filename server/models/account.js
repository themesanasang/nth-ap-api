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
        'account_id', 'account', 'account_name', 'account_old', 'status'
        , knex.raw('CONCAT(DATE_FORMAT(created_at, "%d-%m-"),DATE_FORMAT(created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(updated_at, "%d-%m-"),DATE_FORMAT(updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .orderBy('account', 'ASC')
    .timeout(timeout)

    const findOne = (account_id) => knex.select(
        'account_id', 'account', 'account_name', 'account_old', 'status'
        , knex.raw('CONCAT(DATE_FORMAT(created_at, "%d-%m-"),DATE_FORMAT(created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(updated_at, "%d-%m-"),DATE_FORMAT(updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .whereRaw('account_id = ?', [account_id])
    .timeout(timeout)

    const countWork = (account_id) => knex.count('account_id as numrow')
    .from('ap_account_payable')
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