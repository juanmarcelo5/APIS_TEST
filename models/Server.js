const express = require("express")
const conectarDB = require("../database/config")
require("dotenv").config()
class Server {
	constructor() {
		this.app = express()
		this.path = {
			usuario: "/api/usuario",
		}
		this.dataBaseConect()
		this.middlewares()
		this.routes()
	}

	async dataBaseConect(){
		await conectarDB()
	}
	middlewares(){
		this.app.use(express.json())//para leer el body de la request	
	}
	routes() {
		this.app.use(this.path.usuario, require("../routes/usuarios"))
	}
	listen() {
		const port = process.env.PORT || 4000
		this.app.listen(port, () => {
			console.log("Servidor corriendo en el puerto", port)
		})
	}
}

module.exports = Server
