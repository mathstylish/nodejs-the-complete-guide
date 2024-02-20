const express = require('express')

const router = express.Router()

const userData = require('./users')

router.get('/', (_, res) => {
    const users = userData.users;
    res.render('home', {
        users,
        pageTitle: 'Users',
        styles: ['home', 'user'],
        path: '/users'
    })
})

module.exports = router