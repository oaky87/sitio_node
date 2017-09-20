const Event = require('../models/event');


module.exports= {
	showEvents: showEvents,
	showSingle: showSingle,
	seedEvents: seedEvents,
	showCreate: showCreate,
	processCreate: processCreate,
	showEdit: showEdit,
	processEdit: processEdit,
	deleteEvent: deleteEvent
}

//---------------------------------------------------------------------------
//==creo funcion show all events==
	function showEvents(req, res){

		//const events =[];
		Event.find({}, (err, events) => {
			console.log(events);
			if (err){
				res.status(404);
				res.send('Listado de eventos no encontrados');
			}
		
		//devolvemos una tabla con la data
		res.render('pages/events', {events: events});
	});
	}


//---------------------------------------------------------------------------
//==creo funcion show singles==
	function showSingle(req, res){
		//mostrar solo un evento
		Event.findOne({slug:req.params.slug}, (err,event) => {
			if (err){
				res.status(400);
				res.send('Evento no enccontrado');
			}			
		//devolvemos pagina con la data
		res.render('pages/single', {
			event: event,
			succes: req.flash('succes')
		});
	});
	}


//---------------------------------------------------------------------------
//==creo funcion para crear registro==
	function showCreate(req, res){
		//crear solo un evento desde este json
		//const event = { name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' };
		//crear desde el formulario
		res.render('pages/create',{
			errors: req.flash('errors')
		});

	}
//---------------------------------------------------------------------------
//==creo funcion para procesar el registro==
	function processCreate(req, res){
		//vamos a validar el input del usuario en el form
		req.checkBody('name', 'Debe introducir un nombre.').notEmpty();
		req.checkBody('description', 'Debe introducir una descripción.').notEmpty();

		//si hay errores, redireccionamos y mostramos los errores:
		const errors = req.validationErrors();
		if (errors){
			req.flash('errors', errors.map(err => err.msg));
			return res.redirect('/events/create');
		}


		//creo nuevo evento
		const event = new Event({
			name: req.body.name,
			description: req.body.description
		});
		//salvo evento
		event.save((err) => {
			if(err)
				throw err;

			//setear un mensaje de exito de flash
			req.flash('succes','Registro creado');
			res.redirect(`/events/${event.slug}`);
			
		});
		
	}
// //---------------------------------------------------------------------------
// //==creo funcion para editar registro
	function showEdit(req, res){
		Event.findOne({ slug: req.params.slug }, (err, event) => { //para que el ejs reciba el nombre del evento en la cabezera
		
		res.render('pages/edit', {
			event : event, //para que el ejs reciba el nombre del evento en la cabezera
			errors: req.flash('errors')
		});
	});

	}


	function processEdit(req,res){
		//vamos a validar el input del usuario en el form
		req.checkBody('name', 'Debe introducir un nombre.').notEmpty();
		req.checkBody('description', 'Debe introducir una descripción.').notEmpty();

		//si hay errores, redireccionamos y mostramos los errores:
		const errors = req.validationErrors();
		if (errors){
			req.flash('errors', errors.map(err => err.msg));
			return res.redirect(`/events/${req.params.slug}/edit`);
		}
		// buscamos el registro actual a editar
		Event.findOne({ slug: req.params.slug}, (err, event) => {
			//update del registro
			event.name = req.body.name;
			event.description = req.body.description;

			event.save((err) => {
				if (err)
					throw err;
				//succes flash mensaje
				req.flash('succes', 'Registro editado.');

				//redirect al usuario a /events
				res.redirect('/events');

			});

		});

}
// //---------------------------------------------------------------------------
// //==creo funcion para borrar registro
	function deleteEvent(req, res){
		Event.remove({ slug: req.params.slug}, (err) => {
			//set flash data
			//redirect back a la pagina events
			req.flash('succes', 'registro borrado');
			res.redirect('/events');
		});
	}



// //---------------------------------------------------------------------------
// //==creo funcion para seed to our database

	function seedEvents(req, res){
		//creo algunos eventos
			const events =[
			{ name: 'Basketball', description: 'Throwing into a basket.' },
  			{ name: 'Swimming', description: 'Michael Phelps is the fast fish.' },
  			{ name: 'Weightlifting',  description: 'Lifting heavy things up' },
  			{ name: 'cross-fit',  description: 'Lifting heavy things up' }
  			
		];
		//uso los modelos Event para insertar, salvar 
			Event.remove({}, () => {
			for (event of events){
				var newEvent = new Event(event);
				newEvent.save();
			}
		});
	// seeded
	res.send('database seede!!');
	}

	