const router = require('express').Router()

router.get('/', async (req, res) => {
    const payLoad = { layout: 'admin' }

    res.render('admin/landing', payLoad)
})

router.get('/login', async (req, res) => {
    const payLoad = { layout: 'admin-front' }

    res.render('admin/login', payLoad)
})

module.exports = router