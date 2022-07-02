'use strict'

let knexfile = require('../knexfile')
let knex = require('knex')(knexfile.production)

let { attachOnDuplicateUpdate } = require('knex-on-duplicate-update');
attachOnDuplicateUpdate();

module.exports = knex 