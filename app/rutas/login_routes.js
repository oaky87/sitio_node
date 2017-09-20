const express            = require('express'),
  appLogin               = express.Router();//creo nuevo objeto erouter para la appLogin
  mainController         = require('../controllers/main.controller');//llamo al archivo main.controller
  eventsController       = require('../controllers/events.controller');
  loginController        = require('../controllers/login.controller');
  passport               = require('passport');


//exporto appLogin para que sea accesible
module.exports = appLogin;

//===================================
//backend
appLogin.get('/pages/backend', loginController.showBackend);

//logged si metiese la funcionalidad aca:
//appLogin.get('logged', loginController.showLogged);
   // appLogin.get('/logged', isLoggedIn, function(req, res) {
   //      res.render('logged', {
   //          user : req.user
   //      });
   //  });
appLogin.get('/pages/logged', loginController.showLogged);

appLogin.get('/pages/admin', loginController.showAdmin);


//-----profile
appLogin.get('/pages/profile', loginController.showProfile);
  // PROFILE SECTION =========================
    // appLogin.get('/pages/profile', isLoggedIn, function(req, res) {
    //     res.render('pages/profile', {
    //         user : req.user //username: req.user.username
    //     });
    // });

    // LOGOUT ==============================
    // appLogin.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });


//logout
appLogin.get('/logout', loginController.logOut);
 
// login
appLogin.get('/pages/login', loginController.showLogin);

//proceso logeo
appLogin.post('/pages/login', passport.authenticate('local-login', {
        successRedirect : '/pages/profile', // redirect to the secure profile section
        failureRedirect : '/pages/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // show the signup form
   appLogin.get('/pages/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('pages/signup', { message: req.flash('signupMessage') });
    });


   //singup
appLogin.get('/pages/signup', loginController.showSignupForm);
appLogin.post('/pages/signup', passport.authenticate('local-signup', {
        successRedirect : '/pages/profile', // redirect to the secure profile section
        failureRedirect : '/pages/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

