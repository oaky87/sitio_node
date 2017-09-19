
module.exports= {
	showBackend: showBackend,
	showLogin: showLogin,
	showSignupForm: showSignupForm,
	showProfile: showProfile,
	logOut: logOut,
	showLogged: showLogged,
	showAbout_us: showAbout_us,


	}

function showBackend(req, res){//declaro funcion showHome

//var myVar = 1;
    //res.render('pages/backend', { myVar : myVar });

			res.render('pages/backend', { message: req.flash('loginMessage') });
}

function showLogin(req, res){
        // render the page and pass in any flash data if it exists
        res.render('pages/login', { message: req.flash('loginMessage') }); 
    };



 ///////////////////
function showAbout_us(req, res){

   var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
        var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";


  if (req.isAuthenticated())
         res.render('pages/about_us', {
            user : req.user,
             drinks: drinks,
        tagline: tagline
        });

    // if they aren't redirect them to the home page
    res.redirect('/');
};

function showLogged(req, res){

   var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
        var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";


  if (req.isAuthenticated())
         res.render('pages/logged', {
         	layout: 'logged',
            user : req.user,
             drinks: drinks,
        tagline: tagline
        });

    // if they aren't redirect them to the home page
    res.redirect('/');
};
// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
function showSignupForm(req, res){
	// render the page and pass in any flash data if it exists
        res.render('pages/signup', { message: req.flash('signupMessage') });
}    


//ir al profile
function showProfile(req,res){
	if (req.isAuthenticated())
         res.render('pages/profile', {
          layout: 'logged',
            user : req.user,
        });

    // if they aren't redirect them to the home page
    res.redirect('/pages/profile');
};

//logout
function logOut(req, res) {
        req.logout();
        res.redirect('/');
    };

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



    


   