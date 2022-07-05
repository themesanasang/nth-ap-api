'use strict'

const name = 'Liabilities'
const tableName = 'ap_liabilities'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (liabilities_id) => knex.count('liabilities_id AS numrow')
    .from(tableName)
    .whereRaw('liabilities_id = ?', [liabilities_id])
    .first()
    .timeout(timeout)

    const countByName = (liabilities_type_id, liabilities_name) => knex.count('liabilities_name AS numrow')
    .from(tableName)
    .whereRaw('liabilities_type_id = ?', [liabilities_type_id])
    .whereRaw('liabilities_name = ?', [liabilities_name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select(
        'liabilities_id', 'liabilities_type_id', 'liabilities_name', 'status'
        , knex.raw('(SELECT liabilities_type_name FROM ap_liabilities_type WHERE ap_liabilities_type.liabilities_type_id=ap_liabilities.liabilities_type_id) AS liabilities_type_name')
    )
    .from(tableName)
    .orderBy('liabilities_id', 'ASC')
    .timeout(timeout)

    const findOne = (liabilities_id) => knex.select(
        'liabilities_id', 'liabilities_type_id', 'liabilities_name', 'status'
        , knex.raw('(SELECT liabilities_type_name FROM ap_liabilities_type WHERE ap_liabilities_type.liabilities_type_id=ap_liabilities.liabilities_type_id) AS liabilities_type_name')
    )
    .from(tableName)
    .whereRaw('liabilities_id = ?', [liabilities_id])
    .timeout(timeout)

    const countWork = (liabilities_id) => knex.count('liabilities_id AS numrow')
    .from('ap_item')
    .whereRaw('liabilities_id = ?', [liabilities_id])
    .first()
    .timeout(timeout)

    const update = (liabilities_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('liabilities_id = ?', [liabilities_id])
        .timeout(timeout)
    }

    const destroy = liabilities_id => knex.del()
    .from(tableName)
    .whereRaw('liabilities_id = ?', [liabilities_id])
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