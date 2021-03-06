'use strict'

const name = 'User'
const tableName = 'ap_user'
const timeout = 1000

module.exports = knex => {

    const create = props => {
        return knex.insert(props)
        .returning('id')
        .into(tableName)
        .timeout(timeout)
    }

    const countByUUID = (uuid) => knex.count('uuid AS numrow')
    .from(tableName)
    .whereRaw('uuid = ?', [uuid])
    .first()
    .timeout(timeout)

    const countByUsername = (username) => knex.count('username AS numrow')
    .from(tableName)
    .whereRaw('username = ?', [username])
    .first()
    .timeout(timeout)

    const countByEmail = (email) => knex.count('email AS numrow')
    .from(tableName)
    .whereRaw('email = ?', [email])
    .first()
    .timeout(timeout)

    const countByUsernamePassword = (username, password) => knex.count('username AS numrow')
    .from(tableName)
    .whereRaw('username = ?', [username])
    .whereRaw('password = ?', [password])
    .first()
    .timeout(timeout)

    const findByUsername = (username) => knex.select('uuid', 'username', 'password', 'level')
    .from(tableName)
    .whereRaw('username = ?', [username])
    .whereRaw('status = "Y"')
    .timeout(timeout)

    const findByUsernamePassword = (username, password) => knex.select('*')
    .from(tableName)
    .whereRaw('username = ?', [username])
    .whereRaw('password = ?', [password])
    .timeout(timeout)

    const findByEmail = (email) => knex.select('uuid', 'username', 'level')
    .from(tableName)
    .whereRaw('email = ?', [email])
    .whereRaw('status = "Y"')
    .timeout(timeout)

    const findAll = () => knex.select(
        'uuid', 'username', 'fullname', 'email', 'line_id', 'level', 'status', 'provider'
        , knex.raw('CONCAT(DATE_FORMAT(created_at, "%d-%m-"),DATE_FORMAT(created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(updated_at, "%d-%m-"),DATE_FORMAT(updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .orderBy('created_at', 'ASC')
    .timeout(timeout)

    const findOne = (uuid) => knex.select(
        'uuid', 'username', 'fullname', 'email', 'line_id', 'level', 'status', 'provider'
        , knex.raw('CONCAT(DATE_FORMAT(created_at, "%d-%m-"),DATE_FORMAT(created_at, "%Y")+543) AS date_create') 
        , knex.raw('CONCAT(DATE_FORMAT(updated_at, "%d-%m-"),DATE_FORMAT(updated_at, "%Y")+543) AS date_update') 
    )
    .from(tableName)
    .whereRaw('uuid = ?', [uuid])
    .timeout(timeout)

    const countWork = (uuid) => knex.count('uuid AS numrow')
    .from('ap_account_payable')
    .whereRaw('uuid = ?', [uuid])
    .first()
    .timeout(timeout)

    const update = (uuid, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('uuid = ?', [uuid])
        .timeout(timeout)
    }

    const destroy = uuid => knex.del()
    .from(tableName)
    .whereRaw('uuid = ?', [uuid])
    .timeout(timeout)

    return {
        name, 
        create,
        countByUUID,
        countByUsername,
        countByEmail,
        countByUsernamePassword,
        findByUsername,
        findByUsernamePassword,
        findByEmail,
        findAll,
        findOne,
        countWork,
        update,
        destroy
    }
    
}