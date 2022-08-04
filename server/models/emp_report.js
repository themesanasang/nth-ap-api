'use strict'

const name = 'EmpReport'
const tableName = 'ap_employee_on_report'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .returning('id')
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (id) => knex.count('id AS numrow')
    .from(tableName)
    .whereRaw('id = ?', [id])
    .first()
    .timeout(timeout)

    const countByName = (name) => knex.count('name AS numrow')
    .from(tableName)
    .whereRaw('name = ?', [name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select('*')
    .from(tableName)
    .orderBy('name', 'ASC')
    .timeout(timeout)

    const findOne = (id) => knex.select('*')
    .from(tableName)
    .whereRaw('id = ?', [id])
    .timeout(timeout)

    const update = (id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('id = ?', [id])
        .timeout(timeout)
    }

    const destroy = id => knex.del()
    .from(tableName)
    .whereRaw('id = ?', [id])
    .timeout(timeout)

    return {
        name, 
        create,
        countByID,
        countByName,
        findAll,
        findOne,
        update,
        destroy
    }
    
}