'use strict'

const app = require('./app')
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server started on port ${ PORT }`)
}).on('error', err => {
  console.log('ERROR: ', err)
})