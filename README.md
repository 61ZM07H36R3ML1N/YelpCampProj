# YelpCampProj

App Demo: 

## Introduction
* Yelp Camp is a multi-user web app that utilizes the power of the Node.js environment with Express, MongoDB and NPM packages. This app features a secure user signup and login functions. it also allows logged-users to use full CRUD(Create, Read, Update, Delete) functionality for the campgrounds in the app as well as the comments on each campground. Users can give addresses to campgrounds and have their locations shown on Google Maps securely. this app also features low grade graphics for optimization on Heroku.
*Environment: Node.Js

## Features

* Hosted on Heroku (free) Servers
* Non-relational database (MongoDB)
* Mongoose for configuration of MongoDB models
* Node.js used as server-side environment code
* Express for handling page serving routes
* Method-Override for handling update and delete functions
* EJS for Templating
* Passport.js for essential security measures for password hashing and salting
* Express-Sessions for configuration of cookies
* Geocoder with Google Maps API for rendering locations of campsites
* Alarm/Alert messages to notify errors when user is redirected from a page
* Bootstrap to provide a mobile first responsive design

## Dependencies


## Initial Setup
* Add Landing Page
* Add Campground Page that lists all campgrounds

Each Campground has: 
* Name
* Image

## Layout and Basic Styling
* Create header and footer
* Add in Bootstrap

## Creating New Campgrounds
* Setup new campground POST route (to receive data from the form)
* Add in body-parser(to get the req.body contents)
* Setup route to show form (/new) -- action:"/campgrounds"
* Add basic unstyled form

## Style the campgrounds page
* Add a better header/title
* Make campgrounds display in grid (Bootstrap)

## Style the Navbar and Form
* Add a navbar to all templates
