'use strict'

const name = 'PayableList'
const tableName = 'ap_payable_list'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .into(tableName)
        .timeout(timeout)
    }

    const countByID = (payable_list_id) => knex.count('payable_list_id AS numrow')
    .from(tableName)
    .whereRaw('payable_list_id = ?', [payable_list_id])
    .first()
    .timeout(timeout)

    const countByAll = (payable_id, payable_type_id) => knex.count('payable_list_id AS numrow')
    .from(tableName)
    .whereRaw('payable_id = ?', [payable_id])
    .whereRaw('payable_type_id = ?', [payable_type_id])
    .first()
    .timeout(timeout)

    const findAll = () => knex.select(
        'payable_list_id', 'payable_id', 'payable_type_id', 'status'
        , knex.raw('(SELECT name FROM ap_payable WHERE ap_payable.payable_id=ap_payable_list.payable_id) AS ap_payable_name')
        , knex.raw('(SELECT payable_type_name FROM ap_payable_type WHERE ap_payable_type.payable_type_id=ap_payable_list.payable_type_id) AS payable_type_name')
    )
    .from(tableName)
    .orderBy('payable_list_id', 'ASC')
    .timeout(timeout)

    const findOne = (payable_list_id) => knex.select(
        'payable_list_id', 'payable_id', 'payable_type_id', 'status'
        , knex.raw('(SELECT name FROM ap_payable WHERE ap_payable.payable_id=ap_payable_list.payable_id) AS ap_payable_name')
        , knex.raw('(SELECT payable_type_name FROM ap_payable_type WHERE ap_payable_type.payable_type_id=ap_payable_list.payable_type_id) AS payable_type_name')
    )
    .from(tableName)
    .whereRaw('payable_list_id = ?', [payable_list_id])
    .timeout(timeout)

    const countWork = (payable_list_id) => knex.count('payable_list_id AS numrow')
    .from('ap_item')
    .whereRaw('payable_list_id = ?', [payable_list_id])
    .first()
    .timeout(timeout)

    const update = (payable_list_id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('payable_list_id = ?', [payable_list_id])
        .timeout(timeout)
    }

    const destroy = payable_list_id => knex.del()
    .from(tableName)
    .whereRaw('payable_list_id = ?', [payable_list_id])
    .timeout(timeout)

    return {
        name, 
        create,
        countByID,
        countByAll,
        findAll,
        findOne,
        countWork,
        update,
        destroy
    }
    
}