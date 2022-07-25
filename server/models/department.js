'use strict'

const name = 'Department'
const tableName = 'ap_department'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (id) => knex.count('department_id AS numrow')
    .from(tableName)
    .whereRaw('department_id = ?', [id])
    .first()
    .timeout(timeout)

    const countByCode = (departmen_code) => knex.count('department_code AS numrow')
    .from(tableName)
    .whereRaw('department_code = ?', [departmen_code])
    .first()
    .timeout(timeout)

    const countByName = (departmen_name) => knex.count('department_name AS numrow')
    .from(tableName)
    .whereRaw('department_name = ?', [departmen_name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select('*')
    .from(tableName)
    .orderBy('department_code', 'ASC')
    .timeout(timeout)

    const findOne = (id) => knex.select('*')
    .from(tableName)
    .whereRaw('department_id = ?', [id])
    .timeout(timeout)

    const countWork = (id) => knex.count('department_id AS numrow')
    .from('ap_department_sub')
    .whereRaw('department_id = ?', [id])
    .first()
    .timeout(timeout)

    const update = (id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('department_id = ?', [id])
        .timeout(timeout)
    }

    const destroy = id => knex.del()
    .from(tableName)
    .whereRaw('department_id = ?', [id])
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