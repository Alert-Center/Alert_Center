var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idEmpresa/:idDataCenter/:idRack/:idSensor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idEmpresa/:idDataCenter/:idRack/:idSensor/:chart", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;