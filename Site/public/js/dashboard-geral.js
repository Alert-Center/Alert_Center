/* Inserir nome do usuário que teve seu login aprovado, 
  Dados guardados no armazenamento sa sessão(Veja a pagina script.js:45)*/
nome1.innerHTML = sessionStorage.NOME_USUARIO;

// Função para deixar destacado a página atual
const list = document.querySelectorAll('.list');

function activeLink() {
  list.forEach((item) =>
    item.classList.remove('active'));
  this.classList.add('active');
}

list.forEach((item) =>
  item.addEventListener('click', activeLink));


// ----------------------------------- função para KPI --------------------------------------------------
function obterKPI(KPI, filtro) {
  var idEmpresa = sessionStorage.ID_EMPRESA;

  fetch(`/medidas/KPI/${idEmpresa}/${KPI}/${filtro}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {

        console.log(" ----------- PESQUISANDO KPI -----------");

        // Temperatura -------------------------------------------------- 
        if (filtro == 'temperatura <= 18') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoT")[0].innerHTML = resposta[0].KPI + 'ºC';
            document.querySelectorAll("#fonteT")[0].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateT")[0].innerHTML = resposta[0].dtMetrica
          }
        }
        if (filtro == 'temperatura >= 19 and temperatura <= 22') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoT")[1].innerHTML = resposta[0].KPI + 'ºC';
            document.querySelectorAll("#fonteT")[1].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateT")[1].innerHTML = resposta[0].dtMetrica
          }
        }
        if (filtro == 'temperatura >= 27 and temperatura <= 31') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoT")[2].innerHTML = resposta[0].KPI + 'ºC';
            document.querySelectorAll("#fonteT")[2].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateT")[2].innerHTML = resposta[0].dtMetrica
          }
        }
        if (filtro == 'temperatura >= 32') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoT")[3].innerHTML = resposta[0].KPI + 'ºC';
            document.querySelectorAll("#fonteT")[3].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateT")[3].innerHTML = resposta[0].dtMetrica
          }
        }
        //  -------------------------------------------------- 



        // UMIDADE -------------------------------------------------- 
        if (filtro == 'umidade <= 30') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoU")[0].innerHTML = resposta[0].KPI + '%';
            document.querySelectorAll("#fonteU")[0].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateU")[0].innerHTML = resposta[0].dtMetrica;
          }
        }
        if (filtro == 'umidade >= 31 and umidade <= 46') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoU")[1].innerHTML = resposta[0].KPI + '%';
            document.querySelectorAll("#fonteU")[1].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateU")[1].innerHTML = resposta[0].dtMetrica
          }
        }
        if (filtro == 'umidade >= 63 and umidade <= 79') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoU")[2].innerHTML = resposta[0].KPI + '%';
            document.querySelectorAll("#fonteU")[2].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateU")[2].innerHTML = resposta[0].dtMetrica
          }
        }
        if (filtro == 'umidade >= 80') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoU")[3].innerHTML = resposta[0].KPI + '%';
            document.querySelectorAll("#fonteU")[3].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateU")[3].innerHTML = resposta[0].dtMetrica
          }
        }
        // -------------------------------------------------- 

        setTimeout(() => obterKPI(KPI, filtro), 2000);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}


// Chamar função para atualizar as KPI's
obterKPI('min(temperatura)', 'temperatura <= 18');
obterKPI('min(temperatura)', 'temperatura >= 19 and temperatura <= 22');
obterKPI('max(temperatura)', 'temperatura >= 27 and temperatura <= 31');
obterKPI('max(temperatura)', 'temperatura >= 32');

obterKPI('min(umidade)', 'umidade <= 30');
obterKPI('min(umidade)', 'umidade >= 31 and umidade <= 46');
obterKPI('max(umidade)', 'umidade >= 63 and umidade <= 79');
obterKPI('max(umidade)', 'umidade >= 80');

// -------------------------------------------------------------------------------------





function obterDadosGerais(idDataCenter, metrica) {


  var idEmpresa = sessionStorage.ID_EMPRESA;

  fetch(`/medidas/dadosGerais/${idEmpresa}/${idDataCenter}/${metrica}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {


        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

        plotarGrafico(resposta, metrica, idEmpresa, idDataCenter);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGrafico(resposta, metrica, idEmpresa, idDataCenter) {
  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels_geral = [];

  // Criando estrutura para plotar gráfico - dados
  let data_geral = {
    labels: labels_geral,
    datasets: [{
      label: 'Temperatura (ºC)',
      backgroundColor: '#E0211B',
      borderColor: '#E0211B',
      pointRadius: 5,
      pointBorderWidth: 1,
      pointBorderColor: 'white',
      data: [],
    },
    {
      label: 'Temperatura ideal',
      backgroundColor: 'rgba(112, 255, 99, 0.25)',
    }]
  };



  // Linha horizontal de parâmetro

  yAxes: [{
    display: true,
    gridLines: {
      color: '#fff'
    },
    ticks: {
      fontColor: 'black' // aqui branco
    },
  }]

  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // reverter a resposta por causa do LIMIT
  resposta.reverse();

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];

    labels_geral.push(registro.dtMomento);

    data_geral.datasets[0].data.push(registro.metricaMedia);
  }

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels_geral)
  console.log('Dados:')
  console.log(data_geral.datasets[0].data)
  console.log('----------------------------------------------')


  Chart.defaults.font.color = 'black';
  // Criando estrutura para plotar gráfico - config
  let config_geral = {
    type: 'line',
    data: data_geral,
    options: {
      scales: {
        y: {
          ticks: {
            color: '#FFF'
          },
          beginAtZero: true,
          type: 'linear',
          grid: {
            color: '#FFF'
          }
        },
        x: {
          ticks: {
            color: '#FFF'
          },
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        autocolors: false,
        annotation: {
          annotations: {
            box1: {
              type: 'box',
              yMin: 23,
              yMax: 26,
              xMin: 0,
              xMax: 18,
              backgroundColor: 'rgba(112, 255, 99, 0.25)',
            }
          }
        },
        title: {
          display: true,
          text: `Temperatura média do data center ${idDataCenter} no dia ${resposta[18].dtMetrica}`,
          align: 'center',
          fullSize: false,
          color: '#FFF',
          font: {
            size: 20,
            weight: 600,
            lineHeight: 1.0,
          }
        }
      },
    }
  };

  if (metrica == 'umidade') {
    data_geral.datasets[0].label = 'Umidade (%)';
    data_geral.datasets[0].borderColor = '#078BEE';
    data_geral.datasets[0].backgroundColor = '#078BEE';

    data_geral.datasets[1].label = 'Umidade ideal';

    config_geral.options.plugins.annotation.annotations.box1.yMin = 47
    config_geral.options.plugins.annotation.annotations.box1.yMax = 62

    config_geral.options.plugins.title.text = `Umidade média do data center ${idDataCenter} no dia ${resposta[18].dtMetrica}`;

  }

  let myChart_geral = new Chart(
    document.getElementById(`chart-geral-${metrica == 'temperatura' ? 'temp' : 'umid'}`),
    config_geral
  );


  atualizarGrafico(idEmpresa, idDataCenter, data_geral, metrica, myChart_geral, config_geral);
  // setTimeout(() => atualizarGrafico(idEmpresa,idDataCenter, data_geral, myChart_geral, config_geral), 2000);

}


function atualizarGrafico(idEmpresa, idDataCenter, data_geral, metrica, myChart, config_geral) {
  console.log('METRICAAAAAA', metrica);
  fetch(`/medidas/geral-tempo-real/${idEmpresa}/${idDataCenter}/${metrica}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico:`);
        console.log(data_geral);

        if (novoRegistro[0].dtMomento == data_geral.labels[data_geral.labels.length - 1]) {
          console.log("---------------------------------------------------------------")
          console.log("Como não há dados novos para captura, o gráfico não atualizará.")

          // //Mostrar a mensagem sem dados novos 
          if (metrica == 'temperatura') {
            var element = document.getElementsByClassName("semDadosNovos-gerais")[0];
          } else {
            var element = document.getElementsByClassName("semDadosNovos-gerais")[1];
          }
          element.innerHTML = "Foi trazido o dado mais atual capturado pelo sensor. Como não há dados novos a exibir, o gráfico não atualizará."
          element.style.display = "block";

          console.log("Horário do novo dado capturado:")
          console.log(novoRegistro[0].dtMetrica)
          console.log("Horário do último dado capturado:")
          console.log(data_geral.labels[data_geral.labels.length - 1])
          console.log("---------------------------------------------------------------")

        } else {

          //Sumir mensagem sem dados novos
          if (metrica == 'temperatura') {
            var element = document.getElementsByClassName("semDadosNovos-gerais")[0];
          } else {
            var element = document.getElementsByClassName("semDadosNovos-gerais")[1];
          }
          element.style.display = "none";

          //Atualizar data do título do gráfico
          config_geral.options.plugins.title.text = `${metrica} do data center ${idDataCenter} no dia ${novoRegistro[0].dtMetrica}`;


          // tirando e colocando valores no gráfico
          data_geral.labels.shift(); // apagar o primeiro
          data_geral.labels.push(novoRegistro[0].dtMomento); // adicionar um novo horario

          data_geral.datasets[0].data.shift();  // apagar o primeiro de umidade
          data_geral.datasets[0].data.push(novoRegistro[0].metricaMedia); // incluir uma nova medida de umidade


          myChart.update(); //Atualizar o gráfico
        }

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(() => atualizarGrafico(idEmpresa, idDataCenter, data_geral, metrica, myChart, config_geral), 2000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      // proximaAtualizacao = setTimeout(() => atualizarGrafico(idEmpresa, idDataCenter, data_geral, metrica, myChart, config_geral), 2000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}


// Integração da ferramenta de Help Desk com o Site (Chat Box)
//<![CDATA[
var ttChatLoaderS = document.createElement('script');
document.tomticketChatLoaderScriptVersion = 2;
ttChatLoaderS.src = 'https://ondata.tomticket.com/scripts-chat/chat.min.js'
  + '?id=EP59760'
  + '&account=3824640P16112022101310'
  + '&autoOpen=0'
  + '&hideWhenOffline=0'
  + '&d=ondata'
  + '&ts=' + new Date().getTime()
  + '&ref=' + encodeURIComponent(document.URL);
document.body.appendChild(ttChatLoaderS);
//]]>

obterDadosGerais(1, 'temperatura');
obterDadosGerais(1, 'umidade');