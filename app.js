const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utilities/catchAsyncError');
const ExpressError = require('./utilities/ExpressError');
const methodOverride = require('method-override');
const Campground = require('./models/campground');

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/YelpCampProj', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

// App.set routes
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

// App.use routes
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.use((err, req, res, next) => {
    const {statusCode = 500 } = err;
    if(!err.message) err.message = ' wires crossed!'
    res.status(statusCode).render('error', { err })
});

// App.get Routes
app.get('/', (req, res) => {
    res.render('landing')
});

app.get('/campgrounds', async (req, res,) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', catchAsync(async (req, res, next) => {
    if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
     const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}));

app.get('/campgrounds/:id', catchAsync(async(req, res,) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', { campground });
}));

app.get('/campgrounds/:id/edit', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
}));

// App.put route
app.put('/campgrounds/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`)
}));

// App.delete route
app.delete('/campgrounds/:id', catchAsync(async (req, res) =>{
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

// Server Listening 
app.listen(3001, ()=> {
    console.log('Serving on port 3001')
});