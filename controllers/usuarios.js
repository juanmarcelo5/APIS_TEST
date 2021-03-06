const Usuario = require("../models/Usuario")
const bcryp = require("bcryptjs")

/*Obtenemos todos los usuarios de la bd que estan con estado valido */
const usuarioGetAll = async (req, res) => {
	try {
		const usuarios = await Usuario.find({ estado: true }).select(
			"-_id -__v -password"
		) //excluimos los campos que no queremos mostrar
		res.status(200).json({
			usuarios,
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({
			msg: "Ocurrio un error al obtener los usuarios",
		})
	}
}

/*Obtenemos un  usuario  de la bd que estan con estado valido y filtramos por el nombres */
const usuarioGetOne = async (req, res) => {
	const { nombre } = req.params
	try {
		const usuario = await Usuario.findOne({ nombre, estado: true }).select(
			"-_id -__v -password"
		) //excluimos los campos que no queremos mostrar
		if (!usuario) {
			return res.status(400).json({
				msg: "El usuario no existe , verifique el dato de la busqueda",
			})
		}
		res.status(200).json({
			usuario,
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({
			msg: "Ocurrio un error al obtener los usuarios",
		})
	}
}

/*Insertamos un usuario nuevo*/
const usuarioPost = async (req, res) => {
	const { password } = req.body
	try {
		const usuario = new Usuario(req.body)
		//encriptamos el pass
		const salt = bcryp.genSaltSync(10)
		usuario.password = bcryp.hashSync(password, salt)

		usuario.save()
		res.status(200).json({
			msg: "Usuario registrado correctamente",
			usuario,
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({
			msg: "Ocurrio un error al registrar el usuario",
		})
	}
}

/*Actualizamos los datos del usuario tiene que ser un usuario con estado valido */
const usuarioPut = async (req, res) => {
	const { nombre } = req.params
	try {
		const usuario = await Usuario.findOneAndUpdate(
			{ nombre, estado: true },
			req.body
		) //excluimos los campos que no queremos mostrar
		if (!usuario) {
			return res.status(400).json({
				msg: "El usuario no existe o ha sido eliminado, verifique el dato insertado",
			})
		}
		res.status(200).json({
			msg: "Usuario modificado correctamente",
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({
			msg: "Ocurrio un error al modificar el usuario",
		})
	}
}

const usuarioDelete = async (req, res) => {
	const { nombre } = req.params
	try {
		/*No eliminamos de la bd solo cambiamos de estado 
			para evitar futuros problemas de integridad referencial */
		const usuario = await Usuario.findOneAndUpdate(
			{ nombre },
			{ estado: false }
		)
		res.status(200).json({
			msg: "Usuario eliminado correctamente",
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({
			msg: "Ocurrio un error al modificar el usuario",
		})
	}
}

module.exports = {
	usuarioGetAll,
	usuarioGetOne,
	usuarioPost,
	usuarioPut,
	usuarioDelete,
}
