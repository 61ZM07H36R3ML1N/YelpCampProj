const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsyncError');
const {campgroundSchema} = require ('../schemas.js');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');
const {isLoggedIn} = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', async (req, res,) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
});

router.get('/new', isLoggedIn, (req, res) => {
    if(!req.isAuthenticated()) {
    res.render('campgrounds/new');
    req.flash('error', 'you must be signed in');
    res.redirect('/login');
    }
    return res.render('campgrounds/new');
})

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    if(!req.body.campground) throw new ExpressError
     const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}));

router.get('/:id', catchAsync(async(req, res,) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
}));


router.put('/:id', validateCampground, catchAsync(async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{ ...req.body.campground});
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}));


router.delete('/:id', catchAsync(async (req, res) =>{
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully updated campground!');
    res.redirect('/campgrounds');
}));

module.exports = router;