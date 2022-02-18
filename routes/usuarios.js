const express = require("express")
const { usuarioPost, usuarioGetAll, usuarioGetOne, usuarioPut, usuarioDelete } = require("../controllers/usuarios")
const router = express.Router()

router.get("/",usuarioGetAll)
router.get("/:nombre",usuarioGetOne)
router.post("/",usuarioPost)
router.put("/:nombre",usuarioPut)
router.delete("/:nombre",usuarioDelete)

module.exports = router
