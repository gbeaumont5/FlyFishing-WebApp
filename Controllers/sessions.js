const express = require('express');
const router = express.Router();
const User = require('../models/users');


//new client
router.get('/login', (req, res) => {
    
    res.render('sessions/login.ejs')
})

router.post('/', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (req.body.password === foundUser.password) {
            res.redirect('/');
        } else {
            res.send('wrong password');
        }
    })
})


router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
})

module.exports = router;