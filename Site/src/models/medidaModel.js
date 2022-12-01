var database = require("../database/config");

function buscarUltimasMedidas(idEmpresa, idDataCenter, idRack, idSensor, grafico, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select idRack,
        ${grafico == 2 ? 'temperatura + 20 as temperatura ,umidade + 20 as umidade' : 'temperatura,umidade'},
        DATE_FORMAT(dtMetrica,'%d/%m') as dia,
            DATE_FORMAT(dtMetrica,'%H:%i:%s') as dtMetrica 
            from metrica m 
            join sensor s on m.fkSensor = s.idSensor
            join rack r on s.fkRack = r.idRack
            join DataCenter d on r.fkDataCenter = d.idDataCenter
            join empresa e on d.fkEmpresa = e.idEmpresa
        where e.idEmpresa = ${idEmpresa} and d.idDataCenter = ${idDataCenter} and r.idRack = ${idRack} and s.idSensor = ${idSensor} order by m.dtMetrica desc limit ${limite_linhas};
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idEmpresa, idDataCenter, idRack, idSensor, grafico) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
        select idRack,
            ${grafico == 2 ? 'temperatura + 20 as temperatura ,umidade + 20 as umidade' : 'temperatura,umidade'},
            DATE_FORMAT(dtMetrica,'%H:%i:%s') as dtMetrica,
            DATE_FORMAT(dtMetrica,'%d/%m') as dia
            from metrica m 
                join sensor s on m.fkSensor = s.idSensor
                join rack r on s.fkRack = r.idRack
                join DataCenter d on r.fkDataCenter = d.idDataCenter
                join empresa e on d.fkEmpresa = e.idEmpresa
        where e.idEmpresa = ${idEmpresa} and d.idDataCenter = ${idDataCenter} and r.idRack = ${idRack} and s.idSensor = ${idSensor} order by idMetrica desc limit 1;
       
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarKPI(idEmpresa, KPI, filtro) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
        select idDataCenter, 
            idRack,   
            ${KPI} as KPI,
            DATE_FORMAT(dtMetrica,'%d/%m/%y %H:%i') as dtMetrica
            from metrica m 
                join sensor s on m.fkSensor = s.idSensor
                join rack r on s.fkRack = r.idRack
                join DataCenter d on r.fkDataCenter = d.idDataCenter
                join empresa e on d.fkEmpresa = e.idEmpresa
        where e.idEmpresa = ${idEmpresa} and ${filtro};
       
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarKPI
}
