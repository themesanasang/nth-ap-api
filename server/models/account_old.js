'use strict'

const name = 'AccountOld'
const tableName = 'ap_account_old'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (account_old_id) => knex.count('account_old_id AS numrow')
    .from(tableName)
    .whereRaw('account_old_id = ?', [account_old_id])
    .first()
    .timeout(timeout)

    const countByAccID = (account_id) => knex.count('account_id AS numrow')
    .from(tableName)
    .whereRaw('account_id = ?', [account_id])
    .first()
    .timeout(timeout)

    const countByAccount= (account_id, account_old, account_old_name) => knex.count('account_old_id AS numrow')
    .from(tableName)
    .whereRaw('account_id = ?', [account_id])
    .whereRaw('account_old = ?', [account_old])
    .whereRaw('account_old_name = ?', [account_old_name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select(
        'account_old_id', 'account_id', 'account_old', 'account_old_name'
    )
    .from(tableName)
    .orderBy('account_old_id', 'ASC')
    .timeout(timeout)

    const findOne = (account_id) => knex.select(
        'account_old_id', 'account_id', 'account_old', 'account_old_name'
    )
    .from(tableName)
    .whereRaw('account_id = ?', [account_id])
    .orderBy('account_old_id', 'ASC')
    .timeout(timeout)

    const update = (account_old_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('account_old_id = ?', [account_old_id])
        .timeout(timeout)
    }

    const destroy = account_old_id => knex.del()
    .from(tableName)
    .whereRaw('account_old_id = ?', [account_old_id])
    .timeout(timeout)

    return {
        name, 
        create,
        countByID,
        countByAccID,
        countByAccount,
        findAll,
        findOne,
        update,
        destroy
    }
    
}