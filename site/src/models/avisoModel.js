var database = require("../database/config");


function listarAvisos(filtroTemperaturaMenor,filtroTemperaturaMaior,filtroUmidadeMenor,filtroUmidadeMaior,idEmpresa){

    var instrucao = `SELECT top 20 d.descricao, r.identificacao,s.descricao,m.temperatura,m.umidade,FORMAT(m.dtmetrica,'dd/MM/yyyy hh:mm:ss') as data from empresa e join datacenter d on e.idEmpresa=d.fkempresa join rack r on idDataCenter = fkDataCenter join sensor s on idrack=fkrack join metrica m on idsensor=fksensor  where m.temperatura >= ${filtroTemperaturaMenor} and m.temperatura<=${filtroTemperaturaMaior} or m.umidade>=${filtroUmidadeMenor} and m.umidade <=${filtroUmidadeMaior} and e.idEmpresa=${idEmpresa} order by m.dtMetrica desc ;`
    console.log(instrucao)
    return database.executar(instrucao);
}

module.exports = {
    listarAvisos
}
