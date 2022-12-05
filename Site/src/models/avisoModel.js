var database = require("../database/config");


function listarAvisos(filtroTemperaturaMenor,filtroTemperaturaMaior,filtroUmidadeMenor,filtroUmidadeMaior){

    var instrucao = `SELECT d.descricao, r.identificacao,s.descricao,m.temperatura,m.umidade,FORMAT(m.dtmetrica,'dd/MM/yyyy hh:mm:ss') as data from datacenter d join rack r on idDataCenter = fkDataCenter join sensor s on idrack=fkrack join metrica m on idsensor=fksensor  where m.temperatura >= ${filtroTemperaturaMenor} and m.temperatura<=${filtroTemperaturaMaior} or m.umidade>=${filtroUmidadeMenor} and m.umidade <=${filtroUmidadeMaior}  order by m.dtMetrica;`
    console.log(instrucao)
    return database.executar(instrucao);
}

module.exports = {
    listarAvisos
}
