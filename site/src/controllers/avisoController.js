var avisoModel = require("../models/avisoModel");


function listarAvisoController(req,res){
    console.log("ENTRREEEEI")
    var filtroTemperaturaMenor = req.body.filtroTemperaturaMenor;
    var filtroTemperaturaMaior = req.body.filtroTemperaturaMaior;
    var filtroUmidadeMenor = req.body.filtroUmidadeMenor;
    var filtroUmidadeMaior = req.body.filtroUmidadeMaior;
    var idEmpresa = req.body.idEmpresa;
    avisoModel.listarAvisos(filtroTemperaturaMenor,filtroTemperaturaMaior,filtroUmidadeMenor,filtroUmidadeMaior,idEmpresa).then((resposta)=>{
        res.json(resposta);
    })
    
}

module.exports = {
    listarAvisoController
}