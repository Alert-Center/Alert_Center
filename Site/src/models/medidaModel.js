var database = require("../database/config");

function buscarUltimasMedidas(idEmpresa, idDataCenter, idRack, idSensor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top ${limite_linhas}
        idRack,
        temperatura,
        umidade,
        FORMAT(dtMetrica, 'dd/MM') as dia,
            FORMAT(dtMetrica, 'HH:mm:ss') as dtMetrica 
            from metrica m 
            join sensor s on m.fkSensor = s.idSensor
            join rack r on s.fkRack = r.idRack
            join DataCenter d on r.fkDataCenter = d.idDataCenter
            join empresa e on d.fkEmpresa = e.idEmpresa
        where e.idEmpresa = ${idEmpresa} and d.idDataCenter = ${idDataCenter} and r.idRack = ${idRack} and s.idSensor = ${idSensor} order by m.dtMetrica desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select idRack,
        temperatura,
        umidade,
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

function buscarMedidasEmTempoReal(idEmpresa, idDataCenter, idRack, idSensor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top 1
        idRack,
        temperatura,
        umidade,
        FORMAT(dtMetrica, 'dd/MM') as dia,
            FORMAT(dtMetrica, 'HH:mm:ss') as dtMetrica 
            from metrica m 
            join sensor s on m.fkSensor = s.idSensor
            join rack r on s.fkRack = r.idRack
            join DataCenter d on r.fkDataCenter = d.idDataCenter
            join empresa e on d.fkEmpresa = e.idEmpresa
        where e.idEmpresa = ${idEmpresa} and d.idDataCenter = ${idDataCenter} and r.idRack = ${idRack} and s.idSensor = ${idSensor} order by m.dtMetrica desc`;



    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
        select idRack,
        umidade,
        temperatura,
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
        instrucaoSql = `
        select top 1 
        idDataCenter, 
        ${KPI == 'max(temperatura)' || KPI == 'min(temperatura)' ? 'temperatura' : 'umidade'} as KPI,
        idRack,   
        FORMAT(dtMetrica, 'dd/MM/yy HH:mm') as dtMetrica
        from metrica m 
            join sensor s on m.fkSensor = s.idSensor
            join rack r on s.fkRack = r.idRack
            join DataCenter d on r.fkDataCenter = d.idDataCenter
            join empresa e on d.fkEmpresa = e.idEmpresa
        where e.idEmpresa = ${idEmpresa} and ${KPI == 'max(temperatura)' || KPI == 'min(temperatura)' ? 'temperatura' : 'umidade'} 
        = (select ${KPI} from metrica where ${filtro}) and FORMAT(dtMetrica, 'dd/MM/yy') like (select top 1 FORMAT(dtMetrica, 'dd/MM/yy') from metrica order by dtMetrica desc)
        order by dtMetrica desc;

        `;

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



function dadosGerais(idEmpresa, idDataCenter, metrica, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top ${limite_linhas}
		idDataCenter,
        cast(avg(${metrica}) as decimal(10,2)) as metricaMedia,   
        FORMAT(dtMetrica, 'dd/MM/yy') as dtMetrica,
        FORMAT(dtMetrica, 'HH:mm:ss') as dtMomento
            from metrica m 
            join sensor s on m.fkSensor = s.idSensor
            join rack r on s.fkRack = r.idRack
            join DataCenter d on r.fkDataCenter = d.idDataCenter
            join empresa e on d.fkEmpresa = e.idEmpresa
        where e.idEmpresa = ${idEmpresa} and idDataCenter = ${idDataCenter} group by dtMetrica,idDataCenter;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ``;
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
    buscarKPI,
    dadosGerais
}
