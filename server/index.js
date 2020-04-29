const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const apiRoutes = express.Router()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// Install middleware
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use('/', apiRoutes)

apiRoutes.get('/hoge', (_req, res) => {
    res.json({
        fuga: 'fuga'
    })
})

// -- export app --
module.exports = {
    path: '/api',
    handler: app
}
