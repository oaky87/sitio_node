const express            = require('express'),
  router                 = express.Router();//creo nuevo objeto router
  mainController         = require('../controllers/main.controller');//llamo al archivo main.controller
  eventsController       = require('../controllers/events.controller');
  loginController        = require('../controllers/login.controller');
  passport               = require('passport');


//exporto router para que sea accesible
module.exports = router;

//===================================
//backend
router.get('/pages/backend', loginController.showBackend);

//logged si metiese la funcionalidad aca:
//router.get('logged', loginController.showLogged);
   // router.get('/logged', isLoggedIn, function(req, res) {
   //      res.render('logged', {
   //          user : req.user
   //      });
   //  });
router.get('/pages/logged', loginController.showLogged);

router.get('/pages/about_us', loginController.showAbout_us);


//-----profile
router.get('/pages/profile', loginController.showProfile);
  // PROFILE SECTION =========================
    // router.get('/pages/profile', isLoggedIn, function(req, res) {
    //     res.render('pages/profile', {
    //         user : req.user //username: req.user.username
    //     });
    // });

    // LOGOUT ==============================
    // router.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });


//logout
router.get('/logout', loginController.logOut);
 
// login
router.get('/pages/login', loginController.showLogin);

//proceso logeo
router.post('/pages/login', passport.authenticate('local-login', {
        successRedirect : '/pages/profile', // redirect to the secure profile section
        failureRedirect : '/pages/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // show the signup form
   router.get('/pages/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('pages/signup', { message: req.flash('signupMessage') });
    });


   //singup
router.get('/pages/signup', loginController.showSignupForm);
router.post('/pages/signup', passport.authenticate('local-signup', {
        successRedirect : '/pages/profile', // redirect to the secure profile section
        failureRedirect : '/pages/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

