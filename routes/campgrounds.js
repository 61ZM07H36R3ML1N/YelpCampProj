const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsyncError');
const {campgroundSchema} = require ('../schemas.js');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');
const {isSignedIn} = require('../middleware');

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
    console.log('get to /campgrounds')
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
    console.log('get to /campgrounds completed')
});

router.get('/new', isSignedIn, (req, res) => {
    res.render('campgrounds/new');
})

router.post('/', isSignedIn, validateCampground, catchAsync(async (req, res, next) => {
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

router.get('/:id/edit', isSignedIn, catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
}));


router.put('/:id', validateCampground, isSignedIn, catchAsync(async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{ ...req.body.campground});
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}));


router.delete('/:id', isSignedIn, catchAsync(async (req, res) =>{
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}));

module.exports = router;
