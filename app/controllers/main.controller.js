//main.controller.js
module.exports = {
	//mostrar la pagina home
	showHome: (req, res) =>{//declaro funcion showHome
			res.render('pages/home');//por default va a renderizar lo que encuentre en la carpeta view
			//res.send('server funcionando desde archivo routes.js');//resuelve la funcion mostrando el texto

	}
};
