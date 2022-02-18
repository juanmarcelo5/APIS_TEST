const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true,'El nombre es obligatorio'],
		trim: true,
	},
	edad: {
		type: Number,
		required: [true,'La edad es obligatorio'],
	},
	correo: {
		type: String,
		required: [true,'El correo es obligatorio'],
		unique:true
	},
	password:{
		type:String,
		required: [true,'La constraseña es obligatorio'],
	},
	estado:{
		type:Boolean,
		default:true
	}

})
const Usuario = mongoose.model('Usuarios',usuarioSchema)

module.exports = Usuario;