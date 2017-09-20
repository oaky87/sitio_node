/*routes.js se encarga solo de rutear, la funcionalidad esta en cada controlador o en el archivo de ruteo especifico.
El server.js se encarga solo de lanzar la app
*/
//aca figuran todas las rutas de la app, las creo utilizando express
const express            = require('express'),
	router                 = express.Router();//creo nuevo objeto router
	mainController         = require('../controllers/main.controller');//llamo al archivo main.controller
	eventsController       = require('../controllers/events.controller');
  loginController        = require('../controllers/login.controller');
  passport               = require('passport');
 

//exporto router para que sea accesible
module.exports = router;

//defino las rutas:

//----main route
router.get('/', mainController.showHome);

//----event route
router.get('/events',         eventsController.showEvents);

//seed events
router.get('/events/seed',    eventsController.seedEvents);

//crear evento
router.get('/events/create',  eventsController.showCreate);
router.post('/events/create', eventsController.processCreate);

//mostrar un solo registro
router.get('/events/:slug',   eventsController.showSingle);

//editar registro
router.get('/events/:slug/edit', eventsController.showEdit);
router.post('/events/:slug',     eventsController.processEdit);

//borrar registro
router.get('/events/:slug/delete', eventsController.deleteEvent);

//-------------------------------





//--------------------------------

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');


}


 

    