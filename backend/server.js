// Import external / 3rd party dependencies / modules here
const express = require('express')
const handlebars = require('express-handlebars')
const dotenv = require('dotenv').config() // Dev dependency

// Import internal dependencies here
const deSession = require('./app/services/session.service')
const helpers = require('./app/services/helper.service')

// Import view routes here
const frontRoutes = require('./app/routes/front/user.routes')
const adminRoutes = require('./app/routes/admin/admin.routes')
const branchRoutes = require('./app/routes/branch/branch.routes')

// Import API routes here

// App Initalizations
const app = express()
const hbs = handlebars.create({
    extname: 'hbs',
    helpers: helpers
})
const PORT = process.env.PORT


// Middlewares starts here

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/assets', express.static('res'))
app.use('/bsc', express.static('node_modules/bootstrap/dist/css'))
app.use('/bsj', express.static('node_modules/bootstrap/dist/js'))
app.use('/bsf', express.static('node_modules/bootstrap-icons/font'))
app.use('/bsi', express.static('node_modules/bootstrap-icons/icons'))
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(deSession)

// Middlewares ends here


// Routes starts here

app.use('/admin', adminRoutes)
app.use('/branch', branchRoutes)
app.use(frontRoutes)

// Routes ends here

app.listen(PORT, () => console.log(`Server started, listening at: ${PORT}`))