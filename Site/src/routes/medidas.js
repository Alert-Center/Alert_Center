var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");


router.get("/dadosGerais/:idEmpresa/:idDataCenter/:metrica", function (req, res) {
    medidaController.dadosGerais(req, res);
})

router.get("/ultimas/:idEmpresa/:idDataCenter/:idRack/:idSensor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idEmpresa/:idDataCenter/:idRack/:idSensor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/KPI/:idEmpresa/:KPI/:filtro", function (req, res) {
    medidaController.buscarKPI(req, res);
})

module.exports = router;