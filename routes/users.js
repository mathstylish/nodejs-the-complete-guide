const express = require('express')

const router = express.Router()

const users = []

router.get('/add-user', (_, res) => {
    res.render('add-user', {
        pageTitle: "New user",
        styles: ['form'],
        path: '/admin/add-user'
    })
})

router.post('/add-user', (req, res) => {
    users.push({ username: req.body.username, mainLanguage: req.body.mainLanguage })
    res.redirect('/')
})

module.exports = {
    router,
    users
};