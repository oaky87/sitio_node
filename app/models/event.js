const mongoose 	= require ('mongoose');
	Schema 		= mongoose.Schema;

// create schema, el esquema define que es parte del modelo

const eventSchema = new Schema({
	name: String,
	slug: {
		type: String,
		unique: true
		
		},
	description: String,
});
//middleware====================
// este middleware se va asegurar que el slug sea creado desde el nombre
eventSchema.pre('save', function (next){
	this.slug = slugify(this.name);
	next();
});




//create a model================

const eventModel = mongoose.model('Event', eventSchema);

//export the model para que este disponible en otros archivos
module.exports = eventModel;


//funcion para slugify un name, slugify es: Generate human-readable url slugs from any ordinary string.
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

