'use strict'

const name = 'Payable'
const tableName = 'ap_payable'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (payable_id) => knex.count('payable_id AS numrow')
    .from(tableName)
    .whereRaw('payable_id = ?', [payable_id])
    .first()
    .timeout(timeout)

    const countByName = (name) => knex.count('name AS numrow')
    .from(tableName)
    .whereRaw('name = ?', [name])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select(
        'payable_id', 'name', 'mobile', 'address', 'status'
        , knex.raw('CONCAT(DATE_FORMAT(created_at, "%d-%m-"),DATE_FORMAT(created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(updated_at, "%d-%m-"),DATE_FORMAT(updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .orderBy('created_at', 'ASC')
    .timeout(timeout)

    const findOne = (payable_id) => knex.select(
        'payable_id', 'name', 'mobile', 'address', 'status'
        , knex.raw('CONCAT(DATE_FORMAT(created_at, "%d-%m-"),DATE_FORMAT(created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(updated_at, "%d-%m-"),DATE_FORMAT(updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .whereRaw('payable_id = ?', [payable_id])
    .timeout(timeout)

    const countWork = (payable_id) => knex.count('payable_id as numrow')
    .from('ap_payable_list')
    .whereRaw('payable_id = ?', [payable_id])
    .first()
    .timeout(timeout)

    const update = (payable_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('payable_id = ?', [payable_id])
        .timeout(timeout)
    }

    const destroy = payable_id => knex.del()
    .from(tableName)
    .whereRaw('payable_id = ?', [payable_id])
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