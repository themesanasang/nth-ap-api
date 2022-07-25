'use strict'

const name = 'DepartmentSub'
const tableName = 'ap_department_sub'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (id) => knex.count('department_sub_id AS numrow')
    .from(tableName)
    .whereRaw('department_sub_id = ?', [id])
    .first()
    .timeout(timeout)

    const countByCode = (departmen_sub_code) => knex.count('department_sub_code AS numrow')
    .from(tableName)
    .whereRaw('department_sub_code = ?', [departmen_sub_code])
    .first()
    .timeout(timeout)

    const countByName = (departmen_sub_name) => knex.count('department_sub_name AS numrow')
    .from(tableName)
    .whereRaw('department_sub_name = ?', [departmen_sub_name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select(
        'department_sub_id', 'ap_department.department_id', 'ap_department.department_name', 'department_sub_code', 'department_sub_name', 'ap_department_sub.status'
    )
    .from(tableName)
    .leftJoin('ap_department', 'ap_department.department_id', '=', 'ap_department_sub.department_id')
    .orderBy('department_sub_id', 'ASC')
    .timeout(timeout)

    const findOne = (id) => knex.select(
        'department_sub_id', 'ap_department.department_id', 'ap_department.department_name', 'department_sub_code', 'department_sub_name', 'ap_department_sub.status'
    )
    .from(tableName)
    .leftJoin('ap_department', 'ap_department.department_id', '=', 'ap_department_sub.department_id')
    .whereRaw('department_sub_id = ?', [id])
    .timeout(timeout)

    const countWork = (id) => knex.count('department_sub_id AS numrow')
    .from('ap_account_payable')
    .whereRaw('department_sub_id = ?', [id])
    .first()
    .timeout(timeout)

    const update = (id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('department_sub_id = ?', [id])
        .timeout(timeout)
    }

    const destroy = id => knex.del()
    .from(tableName)
    .whereRaw('department_sub_id = ?', [id])
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