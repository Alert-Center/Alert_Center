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

let proximaAtualizacao;

function obterDadosGrafico(idDataCenter, idRack, idSensor) {

  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  var idEmpresa = sessionStorage.ID_EMPRESA;

  fetch(`/medidas/ultimas/${idEmpresa}/${idDataCenter}/${idRack}/${idSensor}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {

        //Adicionando dia atual ao título do gráfico
        document.getElementsByName("rackData")[0].innerHTML = resposta[0].dia;
        document.getElementsByName("rackData")[1].innerHTML = resposta[0].dia;

        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

        plotarGrafico(resposta, idEmpresa, idDataCenter, idRack, idSensor);

        // Temperatura -------------------------------------------------- 
        document.getElementsByName('statusTemp')[idRack - 1].style.backgroundColor = '#19EE07';

        if (resposta[resposta.length - 1].temperatura <= 18) {
          document.getElementsByName('statusTemp')[idRack - 1].style.backgroundColor = '#9bd4ff';
        }
        if (resposta[resposta.length - 1].temperatura >= 19 && resposta[resposta.length - 1].temperatura <= 22) {
          document.getElementsByName('statusTemp')[idRack - 1].style.backgroundColor = '#078BEE';
        }
        if (resposta[resposta.length - 1].temperatura >= 27 && resposta[resposta.length - 1].temperatura <= 31) {
          document.getElementsByName('statusTemp')[idRack - 1].style.backgroundColor = '#eeac07';
        }
        if (resposta[resposta.length - 1].temperatura >= 32) {
          document.getElementsByName('statusTemp')[idRack - 1].style.backgroundColor = '#E0211B';
        }
        //  -------------------------------------------------- 



        // UMIDADE -------------------------------------------------- 

        document.getElementsByName('statusUmid')[idRack - 1].style.backgroundColor = '#19EE07';

        if (resposta[resposta.length - 1].umidade <= 30) {
          document.getElementsByName('statusUmid')[idRack - 1].style.backgroundColor = '#9bd4ff';
        }
        if (resposta[resposta.length - 1].umidade >= 31 && resposta[resposta.length - 1].umidade <= 46) {
          document.getElementsByName('statusUmid')[idRack - 1].style.backgroundColor = '#078BEE';
        }
        if (resposta[resposta.length - 1].umidade >= 63 && resposta[resposta.length - 1].umidade <= 79) {
          document.getElementsByName('statusUmid')[idRack - 1].style.backgroundColor = '#eeac07';
        }
        if (resposta[resposta.length - 1].umidade >= 80) {
          document.getElementsByName('statusUmid')[idRack - 1].style.backgroundColor = '#E0211B';
        }
        // -------------------------------------------------- 

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGrafico(resposta, idEmpresa, idDataCenter, idRack, idSensor) {
  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
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
      label: 'Umidade (%)',
      backgroundColor: '#078BEE',
      borderColor: '#078BEE',
      pointRadius: 5,
      pointBorderWidth: 1,
      pointBorderColor: 'white',
      data: [],
    }
    ]
  };


  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // reverter a resposta por causa do LIMIT
  resposta.reverse();

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];

    labels.push(registro.dtMetrica);

    dados.datasets[0].data.push(registro.temperatura);
    dados.datasets[1].data.push(registro.umidade);
  }

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')


  // Código para modificar as cores do Eixo X e Y dos Gráficos
  const options = {
    scales:
    {
      x: {
        grid: {
          color: 'rgba(255,255,255,.1)'
        },
        ticks: {
          color: '#FFF'
        }

      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.5)'
        },
        ticks: {
          color: '#FFF'
        },
      }
    }
  };



  // Criando estrutura para plotar gráfico - config
  var config = {
    type: 'line',
    data: dados,
    options: options
  };

  // Adicionando gráfico criado em div na tela 
  let myChart = new Chart(
    document.getElementById(`rack${idRack}`),
    config
  );


  setTimeout(() => atualizarGrafico(idEmpresa, idDataCenter, idRack, idSensor, dados, myChart), 2000);

}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas.

function atualizarGrafico(idEmpresa, idDataCenter, idRack, idSensor, dados, myChart) {
  fetch(`/medidas/tempo-real/${idEmpresa}/${idDataCenter}/${idRack}/${idSensor}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico:`);
        console.log(dados);

        if (novoRegistro[0].dtMetrica == dados.labels[dados.labels.length - 1]) {
          console.log("---------------------------------------------------------------")
          console.log("Como não há dados novos para captura, o gráfico não atualizará.")

          //Mostrar a mensagem sem dados novos 
          document.getElementsByName("semDadosNovos")[0].style.display = "block";
          document.getElementsByName("semDadosNovos")[1].style.display = "block";

          console.log("Horário do novo dado capturado:")
          console.log(novoRegistro[0].dtMetrica)
          console.log("Horário do último dado capturado:")
          console.log(dados.labels[dados.labels.length - 1])
          console.log("---------------------------------------------------------------")

        } else {

          //Mudar cor da div Temperatura e umidade do gráfico

          // Temperatura -------------------------------------------------- 
          document.getElementsByName('statusTemp')[idRack - 1].style.backgroundColor = '#19EE07';

          if (novoRegistro[0].temperatura <= 18) {
            document.getElementsByName('statusTemp')[idRack - 1].style.backgroundColor = '#9bd4ff';
          }
          if (novoRegistro[0].temperatura >= 19 && novoRegistro[0].temperatura <= 22) {
            document.getElementsByName('statusTemp')[idRack - 1].style.backgroundColor = '#078BEE';
          }
          if (novoRegistro[0].temperatura >= 27 && novoRegistro[0].temperatura <= 31) {
            document.getElementsByName('statusTemp')[idRack - 1].style.backgroundColor = '#eeac07';
          }
          if (novoRegistro[0].temperatura >= 32) {
            document.getElementsByName('statusTemp')[idRack - 1].style.backgroundColor = '#E0211B';
          }
          //  -------------------------------------------------- 



          // UMIDADE -------------------------------------------------- 

          document.getElementsByName('statusUmid')[idRack - 1].style.backgroundColor = '#19EE07';

          if (novoRegistro[0].umidade <= 30) {
            document.getElementsByName('statusUmid')[idRack - 1].style.backgroundColor = '#9bd4ff';
          }
          if (novoRegistro[0].umidade >= 31 && novoRegistro[0].umidade <= 46) {
            document.getElementsByName('statusUmid')[idRack - 1].style.backgroundColor = '#078BEE';
          }
          if (novoRegistro[0].umidade >= 63 && novoRegistro[0].umidade <= 79) {
            document.getElementsByName('statusUmid')[idRack - 1].style.backgroundColor = '#eeac07';
          }
          if (novoRegistro[0].umidade >= 80) {
            document.getElementsByName('statusUmid')[idRack - 1].style.backgroundColor = '#E0211B';
          }
          // -------------------------------------------------- 


          //Sumir mensagem sem dados novos
          document.getElementsByName("semDadosNovos")[0].style.display = "none";
          document.getElementsByName("semDadosNovos")[1].style.display = "none";

          //Atualizar data do título do gráfico
          document.getElementsByName("rackData")[0].innerHTML = novoRegistro[0].dia;
          document.getElementsByName("rackData")[1].innerHTML = novoRegistro[0].dia;

          // tirando e colocando valores no gráfico
          dados.labels.shift(); // apagar o primeiro
          dados.labels.push(novoRegistro[0].dtMetrica); // adicionar um novo horario

          dados.datasets[1].data.shift();  // apagar o primeiro de umidade
          dados.datasets[1].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

          dados.datasets[0].data.shift();  // apagar o primeiro de temperatura
          dados.datasets[0].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

          myChart.update(); //Atualizar o gráfico
        }

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(() => atualizarGrafico(idEmpresa, idDataCenter, idRack, idSensor, dados, myChart), 2000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacao = setTimeout(() => atualizarGrafico(idEmpresa, idDataCenter, idRack, idSensor, dados, myChart), 2000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}


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

//função para criar dropdown
function alternarMenu() {
  subMenu.classList.toggle("open-menu")
}

//Chamar o obter dados gráficos com os parâmetros.
//É chamado duas vezes para ser dois gráficos
obterDadosGrafico(1, 1, 1);
obterDadosGrafico(1, 2, 2);