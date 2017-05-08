var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../Models/Users");

router.get('/register', (req, res) => {
    res.render('Register');
});

router.post('/register', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    // Validation

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors
        })
    }
    else {
        var newUser = new Users({
            username: name,
            email: email,
            password: password
        });

        User.createUser(newUser, (err, user) => {
            if (err)
                throw err;
            console.log(user);

        })
        req.flash('success_msg', 'Registered Successfully');
        res.redirect('/users/Login');
    }
});

router.get('/Login', (req, res) => {
    res.render('login');
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err)
                throw err;
            if (!user)
                return done(null, false, { message: "Invalid Credentials" });
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
    function (req, res) {
        res.redirect('/');
    });

router.get('/Logout', (req, res) => {
    req.logOut();
    req.flash("success_msg","Logged out");
    res.redirect('/users/login');
});

module.exports = router;