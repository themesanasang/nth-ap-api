'use strict'

const name = 'General'
const tableName = 'ap_general'
const timeout = 1000

module.exports = knex => {

    const create = (props) => knex.insert(props)
    .into(tableName)
    .timeout(timeout)

    const countByID = (id) => knex.count('id AS numrow')
    .from(tableName)
    .whereRaw('id = ?', [id])
    .first()
    .timeout(timeout)

    const find = () => knex.select('*')
    .from(tableName)
    .timeout(timeout)

    const update = (id, props) => {
        return knex.update(props)
        .from(tableName)
        .whereRaw('id = ?', [id])
        .timeout(timeout)
    }

    return {
        name, 
        create,
        countByID,
        find,
        update
    }
    
}