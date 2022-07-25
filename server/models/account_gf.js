'use strict'

const name = 'AccountGF'
const tableName = 'ap_account_gf'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (gf_id) => knex.count('gf_id AS numrow')
    .from(tableName)
    .whereRaw('gf_id = ?', [gf_id])
    .first()
    .timeout(timeout)

    const countByCode = (gf_code) => knex.count('gf_code AS numrow')
    .from(tableName)
    .whereRaw('gf_code = ?', [gf_code])
    .first()
    .timeout(timeout)

    const countByName = (gf_name) => knex.count('gf_name AS numrow')
    .from(tableName)
    .whereRaw('gf_name = ?', [gf_name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select('*')
    .from(tableName)
    .orderBy('gf_code', 'ASC')
    .timeout(timeout)

    const findOne = (gf_id) => knex.select('*')
    .from(tableName)
    .whereRaw('gf_id = ?', [gf_id])
    .timeout(timeout)

    const countWork = (gf_id) => knex.count('gf_id AS numrow')
    .from('ap_account')
    .whereRaw('gf_id = ?', [gf_id])
    .first()
    .timeout(timeout)

    const update = (gf_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('gf_id = ?', [gf_id])
        .timeout(timeout)
    }

    const destroy = gf_id => knex.del()
    .from(tableName)
    .whereRaw('gf_id = ?', [gf_id])
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