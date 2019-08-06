const express = require('express');
const router = express.Router();
const User = require('../models/users');

//new client
router.get('/newUser', (req, res) => {
    res.render('user/newUser.ejs')
})

router.post('/', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        res.redirect('/');
    });
});

module.exports = router;