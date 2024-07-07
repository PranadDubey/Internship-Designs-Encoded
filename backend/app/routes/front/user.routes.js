const router = require('express').Router()

router.get('/', async (req, res) => {
    const payLoad = {}

    res.render('front/landing')
})

module.exports = router