const express = require('express');
const router = express.Router();
const passport = require ('passport');
const catchAsync = require('../utilities/catchAsyncError');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
});
router.post('/register', catchAsync(async(req, res) => {
try {  
    const { email, username, password} = req.body;
   const user = new User({ email, username });
   const registeredUser = await User.register(user, password);
   req.flash('success', 'Welcome to Camp!!');
   res.redirect('/campgrounds');
} catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
}
}));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'welcome back');
    res.redirect('/campgrounds');
})


router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "goodbye!");
    res.redirect('/campgrounds');
})

module.exports = router;