'use strict'

const name = 'AccountMain'
const tableName = 'ap_account_main'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (acc_main_id) => knex.count('acc_main_id AS numrow')
    .from(tableName)
    .whereRaw('acc_main_id = ?', [acc_main_id])
    .first()
    .timeout(timeout)

    const countByCode = (acc_main_code) => knex.count('acc_main_code AS numrow')
    .from(tableName)
    .whereRaw('acc_main_code = ?', [acc_main_code])
    .first()
    .timeout(timeout)

    const countByName = (acc_main_name) => knex.count('acc_main_name AS numrow')
    .from(tableName)
    .whereRaw('acc_main_name = ?', [acc_main_name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select('*')
    .from(tableName)
    .orderBy('acc_main_code', 'ASC')
    .timeout(timeout)

    const findOne = (acc_main_id) => knex.select('*')
    .from(tableName)
    .whereRaw('acc_main_id = ?', [acc_main_id])
    .timeout(timeout)

    const countWork = (acc_main_id) => knex.count('acc_main_id AS numrow')
    .from('ap_account')
    .whereRaw('acc_main_id = ?', [acc_main_id])
    .first()
    .timeout(timeout)

    const update = (acc_main_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('acc_main_id = ?', [acc_main_id])
        .timeout(timeout)
    }

    const destroy = acc_main_id => knex.del()
    .from(tableName)
    .whereRaw('acc_main_id = ?', [acc_main_id])
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