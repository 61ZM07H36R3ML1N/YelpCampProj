const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
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
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// App.use routes
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

// App.get Routes
app.get('/', (req, res) => {
    res.render('landing')
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', async(req, res) => {
     const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async(req, res,) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/:id/edit', async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
})

// App.put route
app.put('/campgrounds/:id', async(req, res) => {
    const { id } = req.params;
    Campground.findByIdAndUpdate()
})

// Server Listening 
app.listen(3001, ()=> {
    console.log('Serving on port 3001')
});