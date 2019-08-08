const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

//new client
router.get('/login', (req, res) => {
    res.render('sessions/login.ejs')
})

router.post('/', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
            if (req.body.username === ""){
                res.send('Please enter a username')
            } else if (req.body.password === "") {
                res.send('Please enter a password')
            } else if (!foundUser) {
                res.send('Username Invalid')
            } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
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