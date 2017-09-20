//load environment variables
require('dotenv').config();//doteenv debe estar cargado al inicio de todo, NO MOVER de aca.


//cargar nuestras dependencias
const express 		= require ('express'),
	app 			= express(),
	port 			= process.env.PORT || 8080,
	expressLayouts 	= require('express-ejs-layouts'),
	mongoose 		= require('mongoose'),
	bodyParser		= require('body-parser'),
	session			= require('express-session'),
	cookieParser	= require('cookie-parser'),
	flash			= require('connect-flash'),
	expressValidator= require('express-validator'),
	passport 		= require('passport'),
	morgan       	= require('morgan')
	
	



//configurar aplicación===============================
// le paso passport desde la carpeta config
require('./config/passport')(passport); 
// log every request to the console
app.use(morgan('dev')); 
//configurar session y cookie-parser
app.use(cookieParser());

app.use(session({
	secret: process.env.SECRET,
	cookie: { maxAge: 60000},
	resave: true, //fuerza a la session a volver al store
	saveUninitialized: true //no salve sessiones sin modificar
}));

//------------passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());//para pop up mensajes
//debo decirle a express donde buscar los recursos (assets) estaticos
app.use(express.static(__dirname + '/public'));

//pongo ejs como motor de templating
app.set('view engine', 'ejs');
app.set("views", "./views")

app.use(expressLayouts);

//conexion a la BdD mongoDB
mongoose.connect(process.env.DB_URI);
require('./config/passport')(passport); // pass passport for configuration


//uso body parse para grab (tomar) la info desde los form
app.use(bodyParser.urlencoded({ extended: true }));
//express validator debe ir despues de bodyparse porque toma info del form
app.use(expressValidator());

//routear==============================================
app.use(require('./app/rutas/routes'));//le digo donde buscar el archivo que describe las rutas de la app
app.use(require('./app/rutas/login_routes'));
app.use(require('./app/rutas/upload_routes'));
//lanzar servidor======================================
app.listen(port, ()=>{
	console.log(`Aplicacion corriendo en el puerto ${port}`);
});