var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.post("/listarAvisos", function(req,res){
    avisoController.listarAvisoController(req,res)
})
module.exports = router;