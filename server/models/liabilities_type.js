'use strict'

const name = 'LiabilitiesType'
const tableName = 'ap_liabilities_type'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (liabilities_type_id) => knex.count('liabilities_type_id AS numrow')
    .from(tableName)
    .whereRaw('liabilities_type_id = ?', [liabilities_type_id])
    .first()
    .timeout(timeout)

    const countByName = (liabilities_type_name) => knex.count('liabilities_type_name AS numrow')
    .from(tableName)
    .whereRaw('liabilities_type_name = ?', [liabilities_type_name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select(
        'liabilities_type_id', 'liabilities_type_name', 'status'
    )
    .from(tableName)
    .orderBy('liabilities_type_id', 'ASC')
    .timeout(timeout)

    const findOne = (liabilities_type_id) => knex.select(
        'liabilities_type_id', 'liabilities_type_name', 'status'
    )
    .from(tableName)
    .whereRaw('liabilities_type_id = ?', [liabilities_type_id])
    .timeout(timeout)

    const countWork = (liabilities_type_id) => knex.count('liabilities_type_id AS numrow')
    .from('ap_liabilities')
    .whereRaw('liabilities_type_id = ?', [liabilities_type_id])
    .first()
    .timeout(timeout)

    const update = (liabilities_type_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('liabilities_type_id = ?', [liabilities_type_id])
        .timeout(timeout)
    }

    const destroy = liabilities_type_id => knex.del()
    .from(tableName)
    .whereRaw('liabilities_type_id = ?', [liabilities_type_id])
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