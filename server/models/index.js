'use strict'

import * as fs from 'fs';
import * as path from 'path';
import knex from '../../config/db';

let getModelFiles = dir => fs.readdirSync(dir)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .map(file => path.join(dir, file))

  let files = getModelFiles(__dirname)

  let models = files.reduce((modelsObj, filename) => {
    let initModel = require(filename)
    let model = initModel(knex)

  if (model) modelsObj[model.name] = model

  return modelsObj
}, {})

module.exports =  models