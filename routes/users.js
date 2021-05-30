const express = require('express');
const router = express.Router();
const passport = require ('passport');
const catchAsync = require('../utilities/catchAsyncError');
const User = require('../models/user');
const catchAsyncError = require('../utilities/catchAsyncError');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/do_register', catchAsyncError(async(req, res) => {
    console.log('post to do_register')
    try {
        const { email, username, password } =req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if (err) return next(err);
        }) 
        req.flash('success', 'Welcome to Yelp Camp');
        res.redirect('/campgrounds');
    } catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
    console.log('post do_register completed');

}));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!!!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!")
    res.redirect('/campgrounds');
})
module.exports = router;