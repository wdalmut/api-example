const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const config = require('config')
const bodyParser = require('body-parser')
const actions = require('./controllers')

const app = express();

[config.util.getEnv('NODE_ENV')]
  .filter((env) => env !== 'test')
  .map(() => app.use(morgan('combined')))

app.use(cors({
  exposedHeaders: ['x-page', 'x-count', 'x-total', 'x-limit', 'x-to', 'x-from']
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text({type: 'text/plain'}))
app.use(bodyParser.json({type: 'application/json'}))

actions.map((paths) => app.use.apply(app, paths))

app.listen(process.env.NODE_PORT || 3000)

module.exports = app // for testing
