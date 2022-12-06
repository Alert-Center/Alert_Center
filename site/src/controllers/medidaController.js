var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 6;

    var idEmpresa = req.params.idEmpresa;
    var idDataCenter = req.params.idDataCenter;
    var idRack = req.params.idRack;
    var idSensor = req.params.idSensor;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idEmpresa, idDataCenter, idRack, idSensor, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var idDataCenter = req.params.idDataCenter;
    var idRack = req.params.idRack;
    var idSensor = req.params.idSensor;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idEmpresa, idDataCenter, idRack, idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarKPI(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var KPI = req.params.KPI;
    var filtro = req.params.filtro;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarKPI(idEmpresa, KPI, filtro).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function dadosGerais(req, res) {

    const limite_linhas = 19;

    var idEmpresa = req.params.idEmpresa;
    var idDataCenter = req.params.idDataCenter;
    var metrica = req.params.metrica;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.dadosGerais(idEmpresa, idDataCenter, metrica, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function atualizarDadosGerais(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var idDataCenter = req.params.idDataCenter;
    var metrica = req.params.metrica;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.atualizarDadosGerais(idEmpresa, idDataCenter, metrica).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarKPI,
    dadosGerais,
    atualizarDadosGerais
}