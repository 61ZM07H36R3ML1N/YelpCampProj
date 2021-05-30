module.exports.isSignedIn = (req, res, next) => {
if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    req.flash('error', 'you must be logged in');
    return res.redirect('/login');
    }
    next();
}