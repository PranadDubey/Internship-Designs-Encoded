const router = require('express').Router()

router.get('/', async (req, res) => {
    const payLoad = { layout: 'branch' }

    res.render('branch/landing', payLoad)
})

router.get('/login', async (req, res) => {
    const payLoad = { layout: 'branch-front' }

    res.render('branch/login', payLoad)
})

module.exports = router